import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.text}>
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <NavLink to="/" className={styles.button}>
        Back to Home
      </NavLink>
    </div>
  );
};
