import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loaderGradient}></div>
      <span className={styles.loaderText}>Loading</span>
    </div>
  );
};
