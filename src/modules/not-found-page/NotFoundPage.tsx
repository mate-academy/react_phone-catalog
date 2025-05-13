import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <h1>Page not found</h1>
      <Link to="/" className={styles.notFound__button}>
        Go Home
      </Link>
      <img
        src="./img/page-not-found.png"
        alt="Page not found"
        className={styles.notFound__image}
      />
    </div>
  );
};
