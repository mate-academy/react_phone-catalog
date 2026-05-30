import React from 'react';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.LoaderWrapper}>
      <div className={styles.Loader} />
    </div>
  );
};
