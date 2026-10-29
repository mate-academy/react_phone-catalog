import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Page not found</h1>

      <img className={styles.image} src="img/page-not-found.png" alt="" />

      <Link to="/" className={styles.link}>
        Back to home
      </Link>
    </div>
  );
};
