import React from 'react';
import styles from './IconCart.module.scss';
import cartWhite from '../../assets/images/Icons/cartWhite.png';

export const IconCart = () => {
  return (
    <div className={styles.icon}>
      <img alt="favourites" src={cartWhite} className={styles.icon__img} />
    </div>
  );
};
