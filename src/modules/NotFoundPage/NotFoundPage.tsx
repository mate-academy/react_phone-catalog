import { Link } from 'react-router-dom';
import { getImageUrl } from '../../constants';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <main className={styles.page}>
    <img
      src={getImageUrl('img/page-not-found.png')}
      alt="Page not found"
      className={styles.image}
    />

    <h1>Page not found</h1>

    <Link to="/" className={styles.link}>
      Go back home
    </Link>
  </main>
);
