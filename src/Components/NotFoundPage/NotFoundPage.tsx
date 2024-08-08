import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.titel}>
          <h1>Oooops! Something went wrong!</h1>
        </div>
        <div className={styles.button}>
          <Link to={`/`} className={styles.backHome}>
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};
