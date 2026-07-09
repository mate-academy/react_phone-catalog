import { Link } from 'react-router-dom';
import { getAssetPath } from '../../utils/assets';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <main className={styles.page}>
    <img src={getAssetPath('img/page-not-found.png')} alt="" />
    <h1>Page not found</h1>
    <p>The page you are looking for does not exist.</p>
    <Link to="/" className={styles.homeLink}>
      Go to Home
    </Link>
  </main>
);
