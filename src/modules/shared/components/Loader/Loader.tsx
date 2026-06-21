import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.loader} data-cy="loader">
    <div className={styles.content} />
  </div>
);
