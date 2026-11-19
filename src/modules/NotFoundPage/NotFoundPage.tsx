import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={styles.page}>
    <img src="/img/page-not-found.png" alt="" className={styles.image} />
    <h1>Page not found</h1>
    <p>The page you are looking for does not exist.</p>
    <Link to="/">Back to home</Link>
  </div>
);
