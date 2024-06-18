import React from 'react';
import './ProductButtons.scss';
import { Product } from '../../types/Product';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleFavoriteWithLocal } from '../../features/favoritesSlice';
import { createInCartWithLocal } from '../../features/cartSlice';

type Props = {
  product?: Product | null;
  size?: 'normal' | 'high';
};

export const ProductButtons: React.FC<Props> = ({
  product = null,
  size = 'normal',
}) => {
  const favourites = useAppSelector(state => state.favorites);
  const cart = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const isInCart =
    product === null
      ? false
      : !!cart.find(cartProduct => cartProduct.id === product.id);

  const isFavorite =
    product === null
      ? false
      : !!favourites.find(favoriteProduct => favoriteProduct.id === product.id);

  const handleAddFavorite = () => {
    if (product !== null) {
      dispatch(toggleFavoriteWithLocal(product));
    }
  };

  const handleAddToCart = () => {
    if (product !== null) {
      dispatch(createInCartWithLocal(product));
    }
  };

  return (
    <div className="product-buttons">
      <button
        className={classNames(
          'product-buttons__button',
          'product-buttons__button--type--add',
          {
            'product-buttons__button--placeholder': product === null,
            'product-buttons__button--type--add-added': isInCart,
            'product-buttons__button--size--high': size === 'high',
          },
        )}
        onClick={handleAddToCart}
        tabIndex={isInCart ? -1 : 0}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        className={classNames(
          'product-buttons__button',
          'product-buttons__button--type--like',
          {
            'product-buttons__button--placeholder': product === null,
            'product-buttons__button--type--like-favorite': isFavorite,
            'product-buttons__button--size--high': size === 'high',
          },
        )}
        onClick={handleAddFavorite}
        tabIndex={product === null ? -1 : 0}
      ></button>
    </div>
  );
};
