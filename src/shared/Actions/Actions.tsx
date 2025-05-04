import React from 'react';
import styles from './Actions.module.scss';

export const Actions: React.FC = () => {
  return (
    <div className={styles.actions}>
      <button className={styles.actions__addToCart}>Add to cart</button>
      <button type="button" className={styles.actions__like}>
        <img src="img/icons/favorites.svg" alt="Add to favorites" />
      </button>
    </div>
  );
};
