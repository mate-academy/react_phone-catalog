import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={styles.notFoundPage}>
    <h1>Page not found</h1>
    <p>We can&apos;t find the page you are looking for.</p>
    <Link to="/" className={styles.homeLink}>
      Back to home
    </Link>
  </div>
);
