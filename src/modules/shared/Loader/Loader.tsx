import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__outerCircle}>
        <div className={styles.loader__innerCircle}></div>
      </div>
      <p className={styles.loader__text}>Loading...</p>
    </div>
  );
};
