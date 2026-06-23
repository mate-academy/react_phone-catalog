import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsFavorite, toggleFavorites } from '../../features/favorites';
import cn from 'classnames';
import {
  addToCart,
  removeFromCart,
  selectIsAddedToCart,
} from '../../features/cart';
import { Product } from '../../types/Product';
import { useTranslation } from 'react-i18next';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isFav = useAppSelector(state =>
    selectIsFavorite(state, product.itemId),
  );
  const isAddedToCart = useAppSelector(state =>
    selectIsAddedToCart(state, product.itemId),
  );

  const handleToggleFavorites = () => {
    dispatch(toggleFavorites(product));
  };

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      dispatch(addToCart(product));
    } else if (isAddedToCart) {
      dispatch(removeFromCart(product.itemId));
    }
  };

  return (
    <div className="product-card">
      <div className="product-card__top">
        <Link to={`${product.itemId}`}>
          {' '}
          <img
            src={product.image}
            alt={product.name}
            className="product-card-image"
          />
        </Link>

        <Link to={`${product.itemId}`} className="product-card-title">
          {product.name}
        </Link>
      </div>

      <div className="product-card__bottom">
        {product.price !== product.fullPrice ? (
          <div className="product-card-prices">
            <strong className="product-card-price">${product.price}</strong>
            <p className="product-card-fullprice">${product.fullPrice}</p>
          </div>
        ) : (
          <div className="product-card-prices">
            <strong className="product-card-price">${product.price}</strong>
          </div>
        )}

        <div className="product-card-details">
          <div className="product-card-details-option">
            <p className="product-card-details-option-title">{t('screen')}</p>
            <p className="product-card-details-option-value">
              {product.screen}
            </p>
          </div>

          <div className="product-card-details-option">
            <p className="product-card-details-option-title">{t('capacity')}</p>
            <p className="product-card-details-option-value">
              {product.capacity}
            </p>
          </div>

          <div className="product-card-details-option">
            <p className="product-card-details-option-title">{t('RAM')}</p>
            <p className="product-card-details-option-value">{product.ram}</p>
          </div>
        </div>

        <div className="product-card-buttons">
          <button
            className={cn('product-card-buttons-cart', {
              'product-card-buttons-cart--active': isAddedToCart,
            })}
            onClick={handleAddToCart}
          >
            {isAddedToCart ? t('to-cart-succes') : t('to-cart')}
          </button>
          <button
            className={cn('product-card-buttons-fav', {
              'product-card-buttons-fav--active': isFav,
            })}
            onClick={handleToggleFavorites}
          />
        </div>
      </div>
    </div>
  );
};
