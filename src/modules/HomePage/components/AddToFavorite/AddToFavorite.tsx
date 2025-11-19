import React from 'react';
import { useFavorites } from '../../../FavoritesPage/FavoritesContext';
import styles from './AddToFavorite.module.scss';

type AddToFavoritesButtonProps = {
  productId: string;
};

const AddToFavoritesButton: React.FC<AddToFavoritesButtonProps> = ({ productId }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.includes(productId);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    isFavorite ? removeFavorite(productId) : addFavorite(productId);
  };

  return (
    <button
      className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
      onClick={toggle}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '♥' : '♡'}
    </button>
  );
};

export default AddToFavoritesButton;
