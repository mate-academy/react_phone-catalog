import React from 'react';
import { Link } from 'react-router-dom'; // opcjonalnie, jeśli dodasz przycisk
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Page not found</h1>
      {/* Jeśli masz obrazek 404 w public/img, odkomentuj: */}
      {/* <img src="/img/page-not-found.png" alt="Not found" className={styles.image} /> */}
      <p>Sorry, we couldn't find the page you're looking for.</p>

      <Link to="/" className={styles.homeBtn}>
        Go to Home
      </Link>
    </div>
  );
};
