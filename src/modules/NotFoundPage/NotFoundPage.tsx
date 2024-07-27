import React from 'react';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <h2 className={styles.notFoundPage__text}>Page not found</h2>
      <img
        className={styles.notFoundPage__image}
        src="/img/page-not-found.png"
        alt="error 404"
      />
    </div>
  );
};
