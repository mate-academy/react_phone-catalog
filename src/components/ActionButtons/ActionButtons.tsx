import React from 'react';
import styles from './ActionButtons.module.scss';
import favoritesIcon from '../../img/icons/fav.svg';
import { useAppContext } from '../../context/AppContext';

export const ActionButtons: React.FC = () => {
  const isProductInCart = true; // DELETE LATER
  const { handleNotReady } = useAppContext();

  return (
    <div className={styles.buttons} title="Feature not implemented" onClick={handleNotReady}>
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
