import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.wrapper}>
    <div className={styles.spinner} />
  </div>
);
