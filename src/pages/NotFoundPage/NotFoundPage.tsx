import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={styles.notFoundPage}>
    <div className={styles.container}>
      <h1 className={styles.title}>Page not found</h1>
      <Link to="/" className={styles.homeLink}>
        Go to HomePage
      </Link>
    </div>
  </div>
);
