import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader} role="status" aria-label="Loading">
      <span className={styles.circle} />
      <span className={styles.circle} />
      <span className={styles.circle} />
    </div>
  );
};
