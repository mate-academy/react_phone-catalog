import styles from './ErrorMessage.module.scss';

export const ErrorMessage = () => {
  const reload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.error}>
      <h3 className={styles.errormessage}>Something went wrong...</h3>

      <button className={`${styles.errorBtn} button`} onClick={reload}>
        <span className={`${styles.errorBtnText} buttonText`}>Reload</span>
      </button>
    </div>
  );
};
