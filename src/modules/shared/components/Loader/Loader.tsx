import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader__container}>
      <div className={styles.loader__spinner}></div>
    </div>
  );
};
