import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
    </div>
  );
};
