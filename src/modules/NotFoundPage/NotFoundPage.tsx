import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <h1>Page not found</h1>
      <img src="img/page-not-found.png" alt="notFound" />
    </div>
  );
};
