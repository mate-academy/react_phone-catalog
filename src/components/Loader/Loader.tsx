import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.loaderWrapper}>
    <div className={styles.loader} />
    <p>Loading...</p>
  </div>
);
