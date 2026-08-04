import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <p className={styles.code}>404</p>

        <h1 className={styles.title}>Page not found</h1>

        <p className={styles.message}>
          The page you are looking for does not exist.
        </p>

        <Link to="/" className={styles.homeLink}>
          Go to home page
        </Link>
      </div>
    </section>
  );
};
