import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.loaderContainer}>
    <span className={styles.loader}></span>
  </div>
);
