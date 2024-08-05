import styles from './ErrorNotification.module.scss';

export const ErrorNotification = () => (
  <h3 className={styles.errorNotification}>
    Oops, something went wrong. Try reloading your page.
  </h3>
);
