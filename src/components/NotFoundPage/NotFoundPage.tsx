import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.notFoundPage__title}>
        <span>Page not found</span>
      </div>
      <div className={styles.notFoundPage__image}>
        <img src="/img/page-not-found.png" alt="Page not found" />
      </div>

      <Link to="/" className={styles.notFoundPage__button}>
        {' '}
        <span>Back to home</span>
      </Link>
    </div>
  );
};
