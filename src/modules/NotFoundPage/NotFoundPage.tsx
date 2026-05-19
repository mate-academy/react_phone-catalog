import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.container}>
        <h1>Page not found</h1>
        <Link to="/" className={styles.homeLink}>
          Go to Home
        </Link>
      </div>
    </div>
  );
};
