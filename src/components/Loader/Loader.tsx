import React from 'react';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => (
  <div className={styles.loaderCenter} data-cy="loader">
    <div className={styles.loaderContent} />
  </div>
);
