import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.not_found_page}>
      <h1 className={styles.not_found_page__title}>Page not found</h1>

      <Link to="/" className={styles.not_found_page__link}>
        Go Home
      </Link>

      <img
        src={`${import.meta.env.BASE_URL}img/page-not-found.png`}
        alt="Page not found img"
        className={styles.not_found_page__img}
      />
    </div>
  );
};
