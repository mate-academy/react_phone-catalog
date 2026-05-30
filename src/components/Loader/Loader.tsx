import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader__container}>
      <span className={styles.loader}></span>
    </div>
  );
};
