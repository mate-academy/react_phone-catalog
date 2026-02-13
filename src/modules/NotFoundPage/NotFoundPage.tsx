import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFound__title}>404</h1>
      <p className={styles.notFound__text}>Page not found</p>
      <Link to="/" className={styles.notFound__link}>
        Go to Home Page
      </Link>
    </div>
  );
};
