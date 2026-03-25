import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <img
        src="img/page-not-found.png"
        alt="Page not found"
        className={styles.image}
      />
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.description}>
        We couldn&apos;t find this page. The link might be broken, or the page
        has been removed.
      </p>
      <Link to="/" className={styles.button}>
        Go to Home Page
      </Link>
    </div>
  );
};
