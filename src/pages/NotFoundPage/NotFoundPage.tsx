import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Page not found</h1>

      <img
        src={`${import.meta.env.BASE_URL}/img/page-not-found.png`}
        alt="Page not found"
        className={styles.image}
      />

      <p>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>

      <Link to="/" className={styles.homeBtn}>
        Go to Home
      </Link>
    </div>
  );
};
