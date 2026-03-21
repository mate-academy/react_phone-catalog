/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => (
  <main className={styles.main}>
    <div className={styles.content}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.hint}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className={styles.homeBtn}>
        Back to home
      </Link>
    </div>
  </main>
);
