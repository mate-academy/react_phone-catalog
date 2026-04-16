import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>Page not found</h1>
      <Link to="/" className={styles.homeLink}>
        Go to Home page
      </Link>
    </div>
  );
};
