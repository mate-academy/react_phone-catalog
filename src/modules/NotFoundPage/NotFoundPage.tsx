import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={`container ${styles.page}`}>
    <h1 className={styles.title}>Page not found</h1>
    <img src="img/page-not-found.png" alt="" className={styles.image} />
    <Link to="/" className={styles.link}>
      Go to home page
    </Link>
  </div>
);
