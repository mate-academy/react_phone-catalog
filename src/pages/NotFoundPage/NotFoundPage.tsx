import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Page not found 404</h1>
      <img
        src="/img/page-not-found.png"
        alt="not found"
        className={styles.image}
      />
    </div>
  );
};
