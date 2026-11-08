import { Link } from 'react-router-dom';
import styles from './Page404.module.scss';

export const Page404 = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.text}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className={styles.link}>
        Go to Home page
      </Link>
    </div>
  );
};
