import { useNavigate } from 'react-router-dom';
import styles from './Errors.module.scss';

export const ProductError = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.error}>
      <p className={styles.error__text}>Product not found</p>
      <button onClick={() => navigate(-1)} className={styles.error__button}>
        Back
      </button>
    </div>
  );
};
