import React from 'react';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => (
  <div className={styles.loaderWrapper}>
    <div className={styles.loader}></div>
  </div>
);
