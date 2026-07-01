import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

const IMG_BASE = import.meta.env.BASE_URL;

export const NotFoundPage = () => (
  <div className={styles.page}>
    <img
      src={`${IMG_BASE}/img/page-not-found.png`}
      alt="Page not found"
      className={styles.image}
    />
    <h1 className={styles.title}>Page not found</h1>
    <Link to="/" className={styles.link}>
      Go back home
    </Link>
  </div>
);
