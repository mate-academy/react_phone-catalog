import styles from './ErrorPage.module.scss';

export const ErrorPage = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <span className={styles.error__header}>Something went wrong!</span>
        <button className={styles.error__button} onClick={handleReload}>
          Reload
        </button>
      </div>
    </div>
  );
};
