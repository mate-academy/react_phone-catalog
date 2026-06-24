import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.wrapper}>
    <span className={styles.spinner} />
  </div>
);
