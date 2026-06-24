import React from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFound__title}>Page not found</h1>
      <p className={styles.notFound__text}>
        {"Sorry, the page you're looking for doesn't exist."}
      </p>
      <Link to="/" className={styles.notFound__link}>
        Go to Home Page
      </Link>
    </div>
  );
};
