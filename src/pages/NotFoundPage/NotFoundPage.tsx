import React from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <p className={styles.title}>Page not found</p>
      <Link to="/" className={styles.homePage}>
        Home Page
      </Link>
    </div>
  );
};
