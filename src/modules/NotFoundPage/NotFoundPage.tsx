import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <img
        src={`${import.meta.env.BASE_URL}img/page-not-found.png`}
        alt="Page not found"
        style={{ maxWidth: '320px', width: '100%', marginBottom: '24px' }}
      />
      <h1 className={styles.notFound__title}>Page not found</h1>
      <p className={styles.notFound__text}>
        The page you are looking for does not exist.
      </p>
      <Link to="/" className={styles.notFound__link}>
        Back to Home
      </Link>
    </div>
  );
};
