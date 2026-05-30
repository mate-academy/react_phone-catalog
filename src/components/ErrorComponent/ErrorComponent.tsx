import styles from './ErrorComponent.module.scss';

export const ErrorComponent = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className={`${styles.error} container blocksIdentation`}>
      <div className={styles.error__container}>
        <h3 className={styles.error__title}>Something went wrong</h3>

        <button className={styles.error__button} onClick={refreshPage}>
          Reload
        </button>
      </div>
    </div>
  );
};
