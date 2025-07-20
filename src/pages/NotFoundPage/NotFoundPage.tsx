import type { FC } from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage: FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Page Not Found</p>
      <p className={styles.description}>
        The page you are looking for doesn`t exist.
      </p>
      <Link
        to="/"
        className={styles.homeLink}
      >
        Go to Home Page
      </Link>
    </div>
  );
};
