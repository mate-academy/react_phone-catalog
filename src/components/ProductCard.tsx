import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { Product } from '../types/Product';

import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { dispatch: cartDispatch } = useCart();
  const { state: favorites, dispatch: favDispatch } = useFavorites();
  const { t } = useLanguage();

  const isFavorite = favorites.items.some(item => item.id === product.id);

  const handleCart = () => {
    cartDispatch({
      type: 'ADD_TO_CART',
      product,
    });
  };

  const handleFavorite = () => {
    if (isFavorite) {
      favDispatch({
        type: 'REMOVE_FROM_FAVORITES',
        id: product.id,
      });
    } else {
      favDispatch({
        type: 'ADD_TO_FAVORITES',
        product,
      });
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__image-link">
        <div className="product-card__image-wrapper">
          <img
            src={`${import.meta.env.BASE_URL}${product.image}`}
            alt={product.name}
            className={`product-card__image product-card__image--${product.category}`}
          />
        </div>
      </Link>

      <Link to={`/product/${product.id}`} className="product-card__title-link">
        <h3 className="product-card__title">{product.name}</h3>
      </Link>

      <div className="product-card__price">
        <span className="product-card__price-current">${product.price}</span>

        {product.fullPrice > product.price && (
          <span className="product-card__price-full">${product.fullPrice}</span>
        )}
      </div>

      <div className="product-card__actions">
        <button
          type="button"
          className="product-card__cart-button"
          onClick={handleCart}
        >
          {t('addToCart')}
        </button>

        <button
          type="button"
          className={cn('product-card__favorite', {
            'product-card__favorite--active': isFavorite,
          })}
          onClick={handleFavorite}
          aria-label={t('favorites')}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>
    </div>
  );
};
