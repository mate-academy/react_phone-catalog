import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import React from 'react';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          src="./img/page-not-found.png"
          alt="Page not found"
          className={styles.image}
        />
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.text}>
          We&apos;re sorry, the page you requested could not be found.
        </p>
        <Link to="/" className={styles.button}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};
