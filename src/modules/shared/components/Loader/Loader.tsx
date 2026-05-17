import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.root}>
    <div className={styles.spinner} />
  </div>
);
