import React from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className={`container section ${styles['not-found']}`}>
      <img
        src="img/page-not-found.png"
        className={`not-found__img ${styles['not-found__img']}`}
        alt="NotFound"
      />
      <h1 className={styles['not-found__title']}>Page not found</h1>
      <Link className={styles['not-found__link']} to={'/'}>
        Go to home
      </Link>
    </div>
  );
};
