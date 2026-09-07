import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.header}>Page not found</h1>
      <Link to="/" className={styles.backHome}>
        Back to home
      </Link>
    </section>
  );
};
