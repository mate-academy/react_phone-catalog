import React from 'react';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <h2>Oops, page not found</h2>
    </div>
  );
};
