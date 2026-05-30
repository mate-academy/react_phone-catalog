import React from 'react';
import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
};
