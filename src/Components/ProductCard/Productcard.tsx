import React, { useState, useEffect } from 'react';
import { Product } from './types';
import { Link } from 'react-router-dom';
import './productcard.scss';
import { useCartContext } from '../cartcontext/cartcontext';

const ProductCard = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const { cartProducts, addToCart, removeFromCart, favoriteProducts, addToFavorites, removeFromFavorites } = useCartContext();

  useEffect(() => {
    fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json')
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data.find((item: Product) => item.id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error(`Product with ID ${productId} not found.`);
        }
      })
      .catch((error) => console.error('Error fetching product list:', error));
  }, [productId]);

  const handleAddToCartClick = () => {
    const isProductInCart = cartProducts.some((product) => product.id === productId);

    if (isProductInCart) {
      removeFromCart(productId);
    } else {
      addToCart(productId);
    }
  };

  const handleAddToFavoritesClick = () => {
    const isProductInFavorites = favoriteProducts.includes(productId);

    if (isProductInFavorites) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  const calculateDiscountedPrice = () => {
    if (product && product.discount) {
      const discountedPrice = product.price - (product.price * product.discount) / 100;
      return (
        <div className='prices'>
          <p className='discounted-price'>{discountedPrice}$</p>
          <p className='original-price'>{product.price}$</p>
        </div>
      );
    }
    return <p className='price'>{product?.price}$</p>;
  };

  return (
    <div className="product-card">
      <Link className='Link' to={`/${productId}`} state={{ product }}>
        {product && <img src={product.imageUrl} className="image" alt={product.name} />}
        {product && <h2 className="name">{product.name}</h2>}
        {calculateDiscountedPrice()}
        <div className='line'></div>
        {product && (
          <>
            <div className='card-field'>
              <p className='screen'>Screen</p>
              <p>{product.screen}</p>
            </div>
            <div className='card-field'>
              <p className='capacity'>Capacity</p> {product.capacity}
            </div>
            <div className='card-field'>
              <p className='ram'>RAM</p>
              {product.ram}
            </div>
          </>
        )}
      </Link>
      <div className="card-buttons">
        <button
          type="button"
          onClick={handleAddToCartClick}
          className={cartProducts.some((product) => product.id === productId) ? 'button-add added' : 'button-add'}
        >
          {cartProducts.some((product) => product.id === productId) ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          onClick={handleAddToFavoritesClick}
          className={favoriteProducts.includes(productId) ? 'button-like liked' : 'button-like'}
        >
          {/* Your like button content goes here */}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
