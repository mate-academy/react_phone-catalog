import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Page not found</h1>
      <Link to="/" className={styles.link}>
        Go to Home Page
      </Link>
    </div>
  );
};
