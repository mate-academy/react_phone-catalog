import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Product } from '../../types/Product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsFavorite, toggleFavorites } from '../../features/favorites';
import {
  addToCart,
  removeFromCart,
  selectIsAddedToCart,
} from '../../features/cart';
import cn from 'classnames';

type Props = {
  product: Product;
};

export const ProductsSliderCard: React.FC<Props> = ({ product }) => {
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
    <div className="products-slider-card">
      <div className="products-slider-card__top">
        <Link to={`/${product.category}/${product.itemId}`}>
          <img
            src={product.image}
            alt={product.name}
            className="products-slider-card__image"
          />
        </Link>

        <Link
          to={`/${product.category}/${product.itemId}`}
          className="products-slider-card__title"
        >
          {product.name}
        </Link>
      </div>

      <div className="products-slider-card__bottom">
        {product.price !== product.fullPrice ? (
          <div className="products-slider-card-prices">
            <strong className="products-slider-card-price">
              ${product.price}
            </strong>
            <p className="products-slider-card-fullprice">
              ${product.fullPrice}
            </p>
          </div>
        ) : (
          <div className="products-slider-card-prices">
            <strong className="products-slider-card-price">
              ${product.price}
            </strong>
          </div>
        )}

        <div className="products-slider-card-details">
          <div className="products-slider-card-details-option">
            <p className="products-slider-card-details-option-title">
              {t('screen')}
            </p>
            <p className="products-slider-card-details-option-value">
              {product.screen}
            </p>
          </div>

          <div className="products-slider-card-details-option">
            <p className="products-slider-card-details-option-title">
              {t('capacity')}
            </p>
            <p className="products-slider-card-details-option-value">
              {product.capacity}
            </p>
          </div>

          <div className="products-slider-card-details-option">
            <p className="products-slider-card-details-option-title">
              {t('RAM')}
            </p>
            <p className="products-slider-card-details-option-value">
              {product.ram}
            </p>
          </div>
        </div>

        <div className="products-slider-card-buttons">
          <button
            className={cn('products-slider-card-buttons-cart', {
              'products-slider-card-buttons-cart--active': isAddedToCart,
            })}
            onClick={handleAddToCart}
          >
            {isAddedToCart ? t('to-cart-succes') : t('to-cart')}
          </button>
          <button
            className={cn('products-slider-card-buttons-fav', {
              'products-slider-card-buttons-fav--active': isFav,
            })}
            onClick={handleToggleFavorites}
          />
        </div>
      </div>
    </div>
  );
};
