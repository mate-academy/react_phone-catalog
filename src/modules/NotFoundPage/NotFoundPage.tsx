import React from 'react';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <section className={styles.notFoundPage}>
      <div className={styles.container}>
        <div className={styles.notFoundPage__inner}>
          <h2 className={styles.notFoundPage__title}>Page not found</h2>
          <img src="img/page-not-found.png" alt="Not found image" />
        </div>
      </div>
    </section>
  );
};
