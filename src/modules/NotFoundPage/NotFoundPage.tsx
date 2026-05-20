import React from 'react';
import styles from './NotFoundPage.module.scss';
import img from '../../images/page-not-found.png';

export const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <h1>Not Found Page</h1>

      <div className={styles.image_box}>
        <img src={img} alt="Page not found" className={styles.image} />
      </div>
    </div>
  );
};
