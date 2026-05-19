import React from 'react';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <h1>Not Found Page</h1>

      <div className={styles.image_box}>
        <img
          src="/src/images/page-not-found.png"
          alt="Page not found"
          className={styles.image}
        />
      </div>
    </div>
  );
};
