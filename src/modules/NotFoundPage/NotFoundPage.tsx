import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <section className={styles.container}>
    <h1 className={styles.title}>Page Not Found</h1>

    <p className={styles.message}>
      The page you are looking for might have been removed, had its name changed, or is temporarily
      unavailable.
    </p>

    <Link to="/" className={styles.button}>
      Home Page
    </Link>
  </section>
);
