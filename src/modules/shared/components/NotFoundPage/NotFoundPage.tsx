import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <h2 className={styles.text}>Page not found</h2>
      <Link to="/" className={styles.homeLink}>
        Go to Home page
      </Link>
    </div>
  );
};
