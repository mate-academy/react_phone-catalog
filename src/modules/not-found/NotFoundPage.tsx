import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.errorWrapper}>
      <p className={styles.errorMessage}>Page not found</p>

      <Link to="/" className={styles.errorButtonMessage}>
        Go to Home
      </Link>
    </div>
  );
};
