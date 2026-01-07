import React from 'react';
import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.Loader} data-cy="loader">
      <div className={styles.content} />
    </div>
  );
};
