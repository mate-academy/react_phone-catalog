import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className={styles.empty__page}>
      <h1 className={styles['empty__page-title']}>Page not found</h1>

      <Link to="/" className={styles['empty__page-link']}>
        Go to Home page
      </Link>
    </div>
  );
};
