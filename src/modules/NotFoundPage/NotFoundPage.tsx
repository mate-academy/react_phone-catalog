import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={styles.wrapper}>
    <h2 className={styles.title}>Page not found</h2>

    <img
      src="./img/product-not-found.png"
      alt="Not found"
      className={styles.image}
    />
  </div>
);
