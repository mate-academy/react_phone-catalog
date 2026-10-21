import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <main className={styles.page}>
      <p className={styles.errorCode}>404</p>

      <h1 className={styles.title}>Page not found</h1>

      <p className={styles.description}>
        Sorry, the page you requested does not exist.
      </p>

      <Link to="/" className={styles.homeLink}>
        Back to Home
      </Link>
    </main>
  );
};
