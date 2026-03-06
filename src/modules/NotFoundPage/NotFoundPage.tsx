import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={styles.notFound}>
    <h1 className={styles.notFound__title}>Page not found</h1>
    <img
      src="img/page-not-found.png"
      alt="Page not found"
      className={styles.notFound__image}
    />
    <Link to="/" className={styles.notFound__link}>
      Go to Home page
    </Link>
  </div>
);
