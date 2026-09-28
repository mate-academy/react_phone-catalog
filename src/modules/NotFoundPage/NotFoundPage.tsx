import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => (
  <div className={styles.wrapper}>
    <span className={styles.code}>404</span>
    <p className={styles.message}>Page not found</p>
    <Link to="/" className={styles.link}>
      Go back home
    </Link>
  </div>
);
