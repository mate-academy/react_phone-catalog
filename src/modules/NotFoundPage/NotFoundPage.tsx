import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <img
        src="img/page-not-found.png"
        alt="Page not found"
        className={styles.image}
      />
      <p className={styles.text}>Page not found</p>
      <Link to="/" className={styles.link}>
        Go home
      </Link>
    </div>
  );
};
