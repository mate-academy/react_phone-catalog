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

    const handleRippleEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;

      // Remove existing ripples
      const existingRipples = button.getElementsByClassName('ripple');

      for (const ripple of Array.from(existingRipples)) {
        ripple.remove();
      }

      // Create a new ripple
      const ripple = document.createElement('span');

      ripple.classList.add('ripple');

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
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
              src={`${process.env.PUBLIC_URL}/${currentProduct.imageUrl}`}
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
            onClick={(e) => {
              handleAddToCartClick(); handleRippleEffect(e);
            }}
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
            onClick={(e) => {
              handleAddToFavoritesClick(); handleRippleEffect(e);
            }}
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
