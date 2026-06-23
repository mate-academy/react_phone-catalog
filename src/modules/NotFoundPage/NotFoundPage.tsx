import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className={styles.content}>
    <p className={styles.text}>Page not found</p>

    <Link to="/" className={styles.link}>
      Home Page
    </Link>
  </div>
);
