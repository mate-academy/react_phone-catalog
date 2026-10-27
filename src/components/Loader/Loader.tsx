import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.container} role="status">
    <div className={styles.loader} aria-hidden="true" />
    <span className={styles.text}>Loading...</span>
  </div>
);
