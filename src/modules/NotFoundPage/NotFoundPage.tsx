import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { IMG_BASE } from '../../utils/imgBase';

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
