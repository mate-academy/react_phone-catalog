import React from 'react';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => (
  <div className={styles.Loader}>
    <div className={styles.Loader__content} />
  </div>
);
