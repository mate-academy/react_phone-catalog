import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={styles.page}>
    <img src="img/page-not-found.png" alt="" className={styles.image} />

    <h1 className={styles.title}>Page not found</h1>

    <Link to="/" className={styles.homeLink}>
      Go to the home page
    </Link>
  </div>
);
