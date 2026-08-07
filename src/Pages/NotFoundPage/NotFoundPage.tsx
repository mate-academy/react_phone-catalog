// NotFoundPage.tsx
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className="productDetailsPage__container">
      <div className={styles.wraper}>
        <p className={styles.text}>Page not found.</p>

        <Link to="/" className={styles.homeLink}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};
