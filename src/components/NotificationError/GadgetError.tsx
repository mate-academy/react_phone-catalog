import { Link } from 'react-router-dom';
import styles from './NotificationError.module.scss';

export const GadgetError = () => {
  return (
    <div className={styles.error}>
      <p className={styles.error__text}>Product not found</p>
      <button className={styles.error__button}>
        <Link to=".." className={styles.error__link}>
          Back
        </Link>
      </button>
    </div>
  );
};
