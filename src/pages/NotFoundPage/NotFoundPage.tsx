import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <img
        src="img/page-not-found.png"
        alt="Page not found"
        className={styles.image}
      />
      <h2 className={styles.title}>Page not found</h2>
      <p className={styles.text}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className={styles.homeButton}>
        Back to home
      </Link>
    </div>
  );
};
