import React, { useEffect } from 'react';
// eslint-disable-next-line max-len
import { useSelectedProduct } from '../../../utils/contexts/SelectedProductContext';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface ProductProps {
  product: {
    id?: number;
    category?: string;
    itemId: string;
    name?: string;
    fullPrice?: number;
    price: number;
    screen: string;
    capacity: string;
    color: string;
    ram: string;
    year: number;
    image?: string;
  };
  isHotPrices?: boolean;
}

const Product: React.FC<ProductProps> = ({ product, isHotPrices = false }) => {
  const {
    setSelectedProduct,
    setSelectedColor,
    setSelectedCapacity,
    toggleActiveProduct,
    activeProducts,
    cartProducts,
    setCartProducts,
  } = useSelectedProduct();

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const handleSelectProduct = () => {
    setSelectedProduct(product);
    setSelectedColor(product.color);
    setSelectedCapacity(product.capacity);
  };

  const handleAddToFavorite = () => {
    toggleActiveProduct(product); // Виклик через контекст
  };

  const handleAddToCart = () => {
    setCartProducts(prev => {
      const isExist = prev.find(item => item.id === product.id);

      if (!isExist) {
        const updatedCart = [...prev, { ...product, quantity: 1 }];

        localStorage.setItem('cartProducts', JSON.stringify(updatedCart));

        return updatedCart;
      } else {
        return prev;
      }
    }); // Виклик через контекст
  };

  return (
    <article className="product">
      <Link
        to={`/${product.category}/${product.name}`}
        className="product__photo-container"
        onClick={handleSelectProduct}
      >
        <img src={product.image} alt="" className="product__foto" />
      </Link>

      <Link
        to={`/${product.category}/${product.name}`}
        className="product__name body-text-600 body-text-600--black"
        onClick={handleSelectProduct}
      >
        {product.name}
      </Link>
      <p className="product__hot-price">
        <p className="product__two-price">
          {isHotPrices ? `${product.price}€` : `${product.fullPrice}€`}
          {isHotPrices && (
            <span className="product__discount">{`${product.fullPrice}€`}</span>
          )}
        </p>
      </p>
      <div className="product__characters">
        <p className="product__character small-text-700">Screen</p>
        <p
          className="
          product__value 
          product__value--screen 
          small-text-700 
          small-text-700--dark"
        >
          {product.screen}
        </p>

        <p className="product__character small-text-700">Capacity</p>
        <p className="product__value small-text-700 small-text-700--dark">
          {product.capacity}
        </p>

        <p className="product__character small-text-700">RAM</p>
        <p className="product__value small-text-700 small-text-700--dark">
          {product.ram}
        </p>
      </div>

      <div className="product__buttons">
        <button
          className={classNames('addToCart', {
            'addToCart--active': cartProducts.some(
              item => item.id === product.id,
            ),
          })}
          onClick={handleAddToCart}
        >
          {cartProducts.some(item => item.id === product.id)
            ? 'Added to cart'
            : 'Add to cart'}
        </button>
        <button
          className={classNames('addToFavourite', {
            'addToFavourite--active': activeProducts.some(
              item => item.id === product.id,
            ),
          })}
          onClick={handleAddToFavorite}
        ></button>
      </div>
    </article>
  );
};

export default Product;
