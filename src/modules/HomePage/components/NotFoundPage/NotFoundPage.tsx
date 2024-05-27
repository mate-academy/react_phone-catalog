import styles from './NotFoundPage.module.scss';
export const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <img
        src="/img/page-not-found.png"
        className={styles.page__img}
        alt="img"
      />
    </div>
  );
};
