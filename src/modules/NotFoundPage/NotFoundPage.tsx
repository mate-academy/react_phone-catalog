import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFoundTitle}>Page was not found</h1>
      <Link to="/" className={styles.notFoundLink}>
        Back to Home
      </Link>
    </div>
  );
};
