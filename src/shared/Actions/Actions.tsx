import React from 'react';
import styles from './Actions.module.scss';

type Props = {
  isFavorite: boolean;
  toggleFavorite: () => void;
};

export const Actions: React.FC<Props> = ({ isFavorite, toggleFavorite }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite();
  };

  return (
    <div className={styles.actions}>
      <button className={styles.actions__addToCart}>Add to cart</button>
      <button
        onClick={handleClick}
        type="button"
        className={styles.actions__like}
      >
        {isFavorite ? (
          <img src="img/icons/favorites-full.svg" alt="Remove from favorites" />
        ) : (
          <img src="img/icons/favorites-empty.svg" alt="Add to favorites" />
        )}
      </button>
    </div>
  );
};
