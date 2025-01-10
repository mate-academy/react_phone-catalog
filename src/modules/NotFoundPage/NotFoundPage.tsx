import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <h1 className={styles.title}>Page not found</h1>
      <img
        className={styles.image}
        src="img/page-not-found.png"
        alt="notFound"
      />
    </div>
  );
};
