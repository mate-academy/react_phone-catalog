import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.error__page}>
      <h1 className={styles.error__page__title}>Page not found</h1>
      <Link to={'/'} className={styles.error__page__link}>
        Go Home
      </Link>
      <img
        className={styles.error__page__image}
        src="./img/page-not-found.png"
        alt="Page-not-found"
      />
    </div>
  );
};
