import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className={styles.notfound}>
      <h1 className={styles.notfound__title}>Page not found</h1>
      <Link to={'/'} className={styles.notfound__link}>
        <button type="button" className={styles.notfound__button}>
          Back to home
        </button>
      </Link>
      <img
        className={styles.notfound__image}
        src="/img/page-not-found.png"
        alt="Page not foung"
      ></img>
    </div>
  );
};
