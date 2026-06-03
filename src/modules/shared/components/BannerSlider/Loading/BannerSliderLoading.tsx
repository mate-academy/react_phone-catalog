import React from 'react';
import styles from './BannerSliderLoading.module.scss';

export const BannerSliderLoading = () => {
  return (
    <article className={styles.isLoading}>
      <div className={styles.image}></div>
    </article>
  );
};
