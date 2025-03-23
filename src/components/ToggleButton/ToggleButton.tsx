import React from 'react';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/Product';
import classNames from 'classnames';
import styles from './ToggleButton.module.scss';

interface ToggleButtonProps {
  product: Product;
  type: 'cart' | 'favorites';
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  product,
  type,
}) => {
  const {
    cart,
    favorites,
    addToCart,
    removeFromCart,
    addToFavorites,
    removeFromFavorites,
  } = useCart();

  const isActive =
    type === 'cart'
      ? cart.some(item => item.id === product.id)
      : favorites.some(fav => fav.id === product.id);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (type === 'cart') {
      if (isActive) {
        removeFromCart(product.id);
      } else {
        addToCart(product);
      }
    } else {
      if (isActive) {
        removeFromFavorites(product.id);
      } else {
        addToFavorites(product);
      }
    }
  };

  return (
    <button
      type="button"
      className={classNames(styles.toggleButton, {
        [styles.active]: isActive,
        [styles.cart]: type === 'cart',
        [styles.favorites]: type === 'favorites',
      })}
      onClick={toggle}
    >
      {type === 'cart' ? (isActive ? 'Remove from Cart' : 'Add to Cart') : ''}
    </button>
  );
};
