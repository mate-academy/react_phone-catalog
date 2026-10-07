import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <main className={styles.notFound}>
      <img
        src="/img/page-not-found.png"
        alt="Page not found"
        className={styles.image}
      />

      <h1>Page not found</h1>

      <Link to="/" className={styles.homeLink}>
        Go to Home
      </Link>
    </main>
  );
};
