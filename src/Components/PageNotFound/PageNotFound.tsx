import React from 'react';
import styles from './PageNotFound.module.scss';

export const PageNotFound: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <img
        src="./img/page-not-found.png"
        alt="Not found"
        className={styles.pulseImage}
      />
      <p className={styles.text}>
        Oops! The page you are looking for doesn’t exist.
      </p>
    </div>
  );
};
