import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={styles.notFound} data-cy="NotFoundPage">
    <h1 className={styles.notFound__title}>Page not found</h1>
    <Link to="/" className={styles.notFound__link}>
      Go to Home Page
    </Link>
  </div>
);
