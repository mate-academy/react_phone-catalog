import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.loader}>
    <div className={styles.circle}></div>
    <div className={styles.circle}></div>
    <div className={styles.circle}></div>
    <div className={styles.circle}></div>
  </div>
);
