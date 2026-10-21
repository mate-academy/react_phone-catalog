import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={styles.page}>
    <h1 className={styles.title}>Page not found</h1>
    <p className={styles.text}>This page does not exist.</p>
    <Link to="/" className={styles.link}>
      Back to home
    </Link>
  </div>
);
