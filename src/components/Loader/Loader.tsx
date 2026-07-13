import styles from './Loader.styles.module.scss';

export const Loader = () => (
  <div className={styles.loader} data-cy="loader">
    <div className={styles.loaderContent} />
  </div>
);
