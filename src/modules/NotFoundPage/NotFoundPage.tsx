import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>Page not found</h1>
      <img
        src="img/page-not-found.png"
        alt="not-found-page"
        className={styles.image}
      ></img>
      <Link to="/" className={styles.link}>
        Go to Home page
      </Link>
    </div>
  );
};
