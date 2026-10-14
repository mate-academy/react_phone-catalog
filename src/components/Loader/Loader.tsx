import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.loader} role="status">
    <span className={styles.spinner} aria-hidden="true" />
    <span>Loading products...</span>
  </div>
);
