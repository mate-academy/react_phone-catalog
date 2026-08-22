import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.loader} data-cy="loader">
    <span className={styles.loader__ring} />
  </div>
);
