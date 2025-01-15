import React from 'react';
import styles from './IconFavorite.module.scss';
import favouriteWhite from '../../assets/images/Icons/icon-liked-white.png';

export const IconFavorite = () => {
  return (
    <div className={styles.icon}>
      <img alt="favourites" src={favouriteWhite} className={styles.icon__img} />
    </div>
  );
};
