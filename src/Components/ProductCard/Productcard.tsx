import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from './types';
import './productcard.scss';
import {
  useCartContext,
  useFavoritesContext,
} from '../cartcontext/cartcontext';

interface ProductCardProps {
  productId: string;
  // eslint-disable-next-line react/no-unused-prop-types
  onAddToCart: (productId: string) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  onAddToFavorite: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps>
  = ({ productId }) => {
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const {
      cartProducts,
      addToCart,
      removeFromCart,
    } = useCartContext();

    const {
      favoriteProducts,
      addToFavorites,
      removeFromFavorites,
    } = useFavoritesContext();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            // eslint-disable-next-line max-len
            'https://mate-academy.github.io/react_phone-catalog/api/products.json',
          );
          const data: Product[] = await response.json();

          const foundProduct = data.find((item) => item.id === productId);

          if (foundProduct) {
            setCurrentProduct(foundProduct);
          } else {
            setCurrentProduct(null);
          }
        } catch (error) {
          addToCart(productId);
        }
      };

      fetchData();
    }, [productId]);

    const handleAddToCartClick = () => {
      const isProductInCart
        = cartProducts.some((product: Product) => product.id === productId);

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
      if (currentProduct && currentProduct.discount) {
        const discountedPrice = currentProduct.price
          - (currentProduct.price * currentProduct.discount) / 100;

        return (
          <div className="prices">
            <p className="discounted-price">
              {discountedPrice}
              $
            </p>
            <p className="original-price">
              {currentProduct.price}
              $
            </p>
          </div>
        );
      }

      return (
        <p className="price">
          {currentProduct?.price}
          $
        </p>
      );
    };

    return (
      <div className="product-card">
        <Link className="Link" to={`/${productId}`} state={{ product: currentProduct }}>
          {currentProduct && (
            <img
              src={currentProduct.imageUrl}
              className="image"
              alt={currentProduct.name}
            />
          )}
          {currentProduct && <h2 className="name">{currentProduct.name}</h2>}
          {calculateDiscountedPrice()}
          <div className="line" />
          {currentProduct && (
            <>
              <div className="card-field">
                <p className="screen">Screen</p>
                <p>{currentProduct.screen}</p>
              </div>
              <div className="card-field">
                <p className="capacity">Capacity</p>
                {' '}
                {currentProduct.capacity}
              </div>
              <div className="card-field">
                <p className="ram">RAM</p>
                {currentProduct.ram}
              </div>
            </>
          )}
        </Link>
        <div className="card-buttons">
          <button
            type="button"
            onClick={handleAddToCartClick}
            className={cartProducts.some(
              (product: Product) => product.id === productId,
            )
              ? 'button-add added' : 'button-add'}
          >
            {cartProducts.some((product: Product) => product.id === productId)
              ? 'Added to cart' : 'Add to cart'}
          </button>

          <button
            type="button"
            onClick={handleAddToFavoritesClick}
            className={favoriteProducts.includes(productId)
              ? 'button-like liked' : 'button-like'}
          >
            { }
          </button>
        </div>
      </div>
    );
  };

export default ProductCard;
