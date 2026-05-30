import React from 'react';
import styles from './Errors.module.scss';

type Props = {
  path: string;
};

export const FavouritesError: React.FC<Props> = ({ path }) => {
  return (
    <div className={styles.error}>
      <p className={styles['error__text--fav']}>There are no {path} yet</p>
    </div>
  );
};
