import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.loader} data-cy="Loader">
    <div className={styles.loader__content} />
  </div>
);
