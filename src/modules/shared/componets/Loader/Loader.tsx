import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader__wrapper}>
      <div className={styles.loader}></div>
    </div>
  );
};
