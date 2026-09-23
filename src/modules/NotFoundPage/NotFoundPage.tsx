import { withBase } from '../../utils/withBase';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={styles.page}>
    <h1 className={styles.title}>Page not found</h1>

    <img
      src={withBase('/img/page-not-found.webp')}
      alt="Page not found"
      className={styles.image}
    />

    <Link to="/" className={styles.homeLink}>
      Go Home
    </Link>
  </div>
);
