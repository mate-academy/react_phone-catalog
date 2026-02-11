import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.notFoundPage__container}>
        <div className={styles.notFoundPage__imageContainer}>
          <img
            src="./img/page-not-found.png"
            alt="Page Not Found"
            className={styles.notFoundPage__picture}
          />
        </div>

        <div className={styles.notFoundPage__content}>
          <p className={styles.notFoundPage__message}>
            Oops... The page is likely missing
          </p>

          <Link to="/" className={styles.notFoundPage__homeButton}>
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};
