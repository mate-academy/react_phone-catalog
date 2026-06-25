import { Link } from 'react-router-dom';
import { getImg } from '../../utils/getImageUrl';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <img
        src={getImg('/img/page-not-found.png')}
        alt="Page not found"
        className={styles.image}
      />
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.text}>
        The page you are looking for does not exist.
      </p>
      <Link to="/" className={styles.link}>
        Go to Home page
      </Link>
    </div>
  );
};
