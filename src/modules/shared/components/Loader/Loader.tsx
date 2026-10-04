import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.wrapper} role="status" aria-label="Loading">
    <div className={styles.spinner} />
  </div>
);
