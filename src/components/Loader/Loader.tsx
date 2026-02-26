import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.loader_wrapper}>
    <div className={styles.loader} />
  </div>
);
