import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <>
    <img
      src="img/page-not-found.png"
      alt="Page not found"
      className={`${styles.image} not-scale`}
    />
    <h1 className={styles.title}>Page not found</h1>
    <Link to="/" className={styles.link}>
      Go to home page
    </Link>
  </>
);
