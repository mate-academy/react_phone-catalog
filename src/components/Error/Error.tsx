import { useErrorHandling } from '../../hooks/errorHandling';
import styles from './Error.module.scss';

export const Error = () => {
  const { setIsError } = useErrorHandling();

  const handleAgain = () => {
    setIsError(false);
  };

  return (
    <div className={styles.error}>
      <div className={styles.error__wrapper}>
        <div className={styles.error__content}>
          <h2 className={styles.error__title}>Something went wrong</h2>

          <button className={styles.error__btn} onClick={handleAgain}>
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};
