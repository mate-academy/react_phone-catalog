import styles from './ErrorMessage.module.scss';

export const ErrorMessage = () => {
  return (
    <div className={styles.errorBlock}>
      <p className={`button-text ${styles.notification}`}>
        Something went wrong
      </p>
      <button
        className={`button-text ${styles.reloadButton}`}
        onClick={() => window.location.reload()}
      >
        Reload
      </button>
    </div>
  );
};
