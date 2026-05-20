import React from 'react';
import styles from './CategoryCardLoading.module.scss';

export const CategoryCardLoading = () => {
  return (
    <article className={styles.isLoading}>
      <div className={styles.image}></div>
      <div className={styles.categories_name}></div>
      <div className={styles.categories_count}></div>
    </article>
  );
};
