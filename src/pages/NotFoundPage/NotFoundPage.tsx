import styles from './NotFoundPage.module.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import notFoundPage from '../../images/page-not-found.png';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <h1 className={styles.notFoundPage__title}>Page not found</h1>
      <Link to="/" className={styles.notFoundPage__link}>
        GO TO HOMEPAGE
      </Link>
      <img
        className={styles.notFoundPage__image}
        src={notFoundPage}
        alt="page-not-found"
      />
    </div>
  );
};
