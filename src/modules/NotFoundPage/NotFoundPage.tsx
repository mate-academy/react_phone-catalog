import React from 'react';
import styles from './NotFoundPage.module.scss';
import imgNotFound from '../../../public/img/page-not-found.png';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notfoundpage}>
      <h1 className={styles.notfoundpage__title}>404 - Page Not Found</h1>
      <p className={styles.notfoundpage__text}>
        The page you are looking for does not exist.
      </p>
      <img
        className={styles.notfoundpage__image}
        src={imgNotFound}
        alt="Page Not Found"
      />
    </div>
  );
};
