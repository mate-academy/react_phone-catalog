import styles from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titel}>
        <h1>Loading...</h1>
      </div>
    </div>
  );
};
