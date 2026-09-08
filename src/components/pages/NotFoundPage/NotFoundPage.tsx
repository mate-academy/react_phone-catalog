import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.error}>
      <h2>Page not found</h2>
      <div className={styles.error__container}>
        <img src="./img/page-not-found.png" alt="404" />
      </div>
    </div>
  );
};
