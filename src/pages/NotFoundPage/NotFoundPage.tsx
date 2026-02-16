import React from 'react';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles['not-found__wrapper']}>
      <img
        src="img/page-not-found.png"
        alt="not found image"
        className={styles['not-found__image']}
      />
    </div>
  );
};
