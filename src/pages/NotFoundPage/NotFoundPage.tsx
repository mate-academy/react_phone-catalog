import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <>
      <div className={styles.error}>
        <h3 className={styles.error__text}>Not found page</h3>
        <button className={styles.error__button}>
          <Link to=".." className={styles.error__link}>
            Back
          </Link>
        </button>
      </div>
    </>
  );
};
