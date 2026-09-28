import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.loader} aria-label="Loading">
    <div className={styles.circle} />
  </div>
);
