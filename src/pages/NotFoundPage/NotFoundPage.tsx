import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles['page-not-found']}>
      <h1>Page not found</h1>
      <img
        src=".../img/page-not-found.png"
        alt="pageNotFound"
        className={styles.pictures}
      />
    </div>
  );
};

export default NotFoundPage;
