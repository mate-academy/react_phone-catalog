import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import React from 'react';

export const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Page not found</h2>
        <p className={styles.text}>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to="/" className={styles.homeBtn}>
          Back to homepage
        </Link>
      </div>
    </div>
  );
};
