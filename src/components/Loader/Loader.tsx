import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <svg className={styles.loader__svg} viewBox="25 25 50 50">
        <circle
          className={styles.loader__circle}
          r="20"
          cy="50"
          cx="50"
        ></circle>
      </svg>
    </div>
  );
};
