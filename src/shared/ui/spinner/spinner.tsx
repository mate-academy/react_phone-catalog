import styles from './spinner.module.scss';

export const Spinner = () => (
  <div className={styles.spinner}>
    <div className={styles.spinner__circle}></div>
  </div>
);
