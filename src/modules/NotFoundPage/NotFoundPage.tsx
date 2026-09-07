import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Not Found Page</p>

      <Link to="/" className={styles.button}>
        Go Home
      </Link>
    </div>
  );
};
