import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={`${styles.page} ${styles.container}`}>
      <span className={styles.page__title}>Page not found</span>
      <img
        src="/img/page-not-found.png"
        alt="Page not found"
        className={styles.page__img}
      />
    </div>
  );
};
