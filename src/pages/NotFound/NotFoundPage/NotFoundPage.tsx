import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <img
          src="img/page-not-found.png"
          alt="Page Not Found"
          className={styles.image}
        />
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Oops! Page Not Found</p>
        <p className={styles.description}>
          It seems we’ve wandered off the path. Let’s get you back home!
        </p>
        <Link to="/" className={styles.homeButton}>
          Return Home
        </Link>
      </div>
      <div className={styles.background}></div>
    </div>
  );
};
