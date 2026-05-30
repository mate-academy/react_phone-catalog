import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__spinner}></div>
      <p className={styles.loader__text}>Loading...</p>
    </div>
  );
};
