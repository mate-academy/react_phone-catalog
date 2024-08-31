import React from 'react';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.header}>Page not found</h1>
      <img
        src="../img/page-not-found.png"
        alt="Not found Page image"
        className={styles.image}
      />
    </section>
  );
};
