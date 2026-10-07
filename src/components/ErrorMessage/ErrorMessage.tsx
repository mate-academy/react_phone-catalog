import styles from './ErrorMessage.module.scss';

interface Props {
  errorMessage: string;
}

export const ErrorMessage: React.FC<Props> = ({ errorMessage }) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.error__container}>
      <div className={styles.error__wrapper}>
        <span className={styles.error__wrapper__span}>{errorMessage}</span>
        <button
          className={styles.error__wrapper__button}
          onClick={handleReload}
        >
          Try again
        </button>
      </div>
    </div>
  );
};
