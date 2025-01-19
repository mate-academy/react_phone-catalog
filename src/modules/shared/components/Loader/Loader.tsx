import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.Loader} data-cy="loader">
    <div className={styles.Loader__content} />
  </div>
);
