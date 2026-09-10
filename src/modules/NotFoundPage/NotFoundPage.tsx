import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <main className={styles.notFoundPage}>
      <h1 className={styles.title}>Page not found</h1>
      <img
        src="/img/page-not-found.png"
        alt="Page not found image"
        className={styles.img}
      />
    </main>
  );
};
