import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          src="img/page-not-found.png"
          alt="404 Not Found"
          className={styles.image}
        />

        <h1 className={styles.title}>Page not found</h1>

        <Link to="/" className={styles.homeLink}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};
