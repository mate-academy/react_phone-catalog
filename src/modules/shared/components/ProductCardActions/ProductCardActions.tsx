import React from 'react';
import styles from './ProductCardActions.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    img: string;
    category: string;
  };
};

export const ProductCardActions: React.FC<Props> = ({ product }) => {
  const { cart, addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some(item => item.id === product.id);

  if (!product) {
    return null;
  }

  const isAdded = cart.some(item => item.id === product.id);

  const handleToggleFavorite = () => {
    toggleFavorite(product);
  };

  const handleAddToCart = () => {
    if (!isAdded) {
      addToCart(product);
    }
  };

  return (
    <div className={styles['card-actions']}>
      <button
        className={`${styles['card-actions__button-cart']} ${
          isAdded ? styles['card-actions__button-cart--active'] : ''
        }`}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          handleAddToCart();
        }}
      >
        {isAdded ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        className={`${styles['card-actions__button-favorite']} ${
          isFavorite ? styles['card-actions__button-favorite--active'] : ''
        }`}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          handleToggleFavorite();
        }}
      >
        <img
          src="/img/icons/heart.svg"
          alt="Empty"
          className={styles['card-actions__icon-heart-empty']}
        />
        <img
          src="/img/icons/heart-active.svg"
          alt="Pink"
          className={styles['card-actions__icon-heart-pink']}
        />
      </button>
    </div>
  );
};
