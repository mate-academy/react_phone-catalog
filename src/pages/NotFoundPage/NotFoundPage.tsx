import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={styles['not-found']} data-cy="NotFoundPage">
    <h1 className={styles['not-found__title']}>Page not found</h1>
    <Link to="/" className={styles['not-found__link']}>
      Go to Home Page
    </Link>
  </div>
);
