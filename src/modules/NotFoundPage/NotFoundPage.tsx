import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={styles.page}>
    <h1 className={styles.title}>Page not found</h1>
    <img
      src="img/page-not-found.png"
      alt="Page not found"
      className={styles.image}
    />
    <Link to="/" className={styles.text}>
      Go to Home page
    </Link>
  </div>
);
