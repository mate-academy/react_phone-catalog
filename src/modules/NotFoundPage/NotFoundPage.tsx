import React from 'react';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <h1 className={styles.notFoundPage__title}>404</h1>
      <p className={styles.notFoundPage__subtitle}>Page not found</p>
    </div>
  );
};
