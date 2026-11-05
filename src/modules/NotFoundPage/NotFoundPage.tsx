import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <img
        src="img/page-not-found.png"
        alt=""
        className={styles.notFoundPageImage}
      />

      <h1 className={styles.notFoundPageTitle}>Page not found</h1>

      <Link to="/" className={styles.notFoundPageButton}>
        Go home
      </Link>
    </div>
  );
};
