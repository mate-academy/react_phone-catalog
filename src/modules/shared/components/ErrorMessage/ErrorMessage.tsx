import styles from './ErrorMessage.module.scss';

export const ErrorMessage = () => (
  <div className={styles.error}>
    <h4 className={styles.error__text}>Something went wrong</h4>
    <button
      className={styles.error__btn}
      onClick={() => window.location.reload()}
    >
      <span className={styles.error__btn_icon}></span>
    </button>
  </div>
);
