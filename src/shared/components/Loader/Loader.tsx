import styles from './Loader.module.scss';
export const Loader = () => {
  return (
    <div className={styles['loader-wrapper']}>
      <p>Loading</p>
      <div className={styles.loader}></div>
    </div>
  );
};
