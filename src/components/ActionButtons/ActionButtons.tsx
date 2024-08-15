import React from 'react';
import styles from './ActionButtons.module.scss';
import favoritesIcon from '../../img/icons/fav.svg';

export const ActionButtons: React.FC = () => {
  const isProductInCart = true; // DELETE LATER
  const handleNoteReady = () => {
    alert('Feature has not been implemented');
  };

  return (
    <div className={styles.buttons} title="Feature not implemented" onClick={handleNoteReady}>
      <button className={styles.buttonCard}>
        <p className={styles.buttonText}>
          {isProductInCart ? 'Remove' : 'Add to cart'}
        </p>
      </button>
      <button className={styles.buttonFavorite} title="Feature not implemented">
        <img
          className={styles.buttonFavoriteIcon}
          src={favoritesIcon}
          alt="favorite"
        />
      </button>
    </div>
  );
};
