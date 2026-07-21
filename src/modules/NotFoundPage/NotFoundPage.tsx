import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Page Not Found 404</h1>
      </div>

      <div className={styles.imageWrapper}>
        <img
          src="img/page-not-found.png"
          alt="Page not found"
          className={styles.image}
        />
      </div>
    </>
  );
};
