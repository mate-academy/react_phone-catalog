import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFountPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={`${styles.page} container`}>
      <h1 className={styles.page__title}>Page not found</h1>
      <Link className={styles.page__link} to={'/'}>
        Back to home page
      </Link>
    </div>
  );
};
