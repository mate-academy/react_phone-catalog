import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => (
  <main className={styles.page}>
    <div className={styles.container}>
      <img
        src="/img/page-not-found.png"
        alt="Page not found"
        className={styles.image}
      />
      <h1 className={styles.title}>Page not found</h1>
      <Link to="/" className={styles.link}>
        Go to Home page
      </Link>
    </div>
  </main>
);
