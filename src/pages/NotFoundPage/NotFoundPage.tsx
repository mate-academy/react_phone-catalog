import styles from './NotFoundPage.module.scss';
import notFoundImage from '../../UI/photos/page-not-found.png';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <img
          src={notFoundImage}
          alt="Page not found"
          className={styles.image}
        />

        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.subtitle}>
          Looks like this page doesn’t exist or was moved.
        </p>

        <Link to="/" className={styles.button}>
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
