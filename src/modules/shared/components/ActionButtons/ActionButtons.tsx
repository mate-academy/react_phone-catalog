import React from 'react';
import styles from './ActionButtons.module.scss';
import { HeartIcon } from '../Icons';
import { useOutletContext } from 'react-router-dom';
import { ContextProps } from '../../../../types/ContextProps';
import { Product } from '../../../../types/Product';
import { ProductDetails } from '../../../../types/ProductDetails';

interface Props {
  product: Product | ProductDetails;
  size?: 'small' | 'large';
}

export const ActionButtons: React.FC<Props> = ({ product, size = 'small' }) => {
  const { favorites, toggleFavorite, cart, addToCart } =
    useOutletContext<ContextProps>();
  const targetId = 'itemId' in product ? product.itemId : product.id;
  const isFavorite = favorites.includes(targetId);
  const isInCart = cart.some(item => item.id === targetId);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleFavorite(targetId);
  };

  const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart(targetId);
  };

  return (
    <div className={`${styles.buttons} ${styles[size]}`}>
      <button className={styles.addToCart} onClick={handleCartClick}>
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        className={`${styles.favorite} ${isFavorite ? styles.favoriteActive : ''}`}
        onClick={handleFavoriteClick}
      >
        <HeartIcon isFilled={isFavorite} />
      </button>
    </div>
  );
};
