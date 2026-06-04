import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1>Not Found</h1>
      <img
        className={styles.notFoundImg}
        src="/img/product-not-found.png"
        alt="Not Found"
      />
    </div>
  );
};
