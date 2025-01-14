import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.back}>
        <a href="/">
          <div className={styles.backContainer}>
            <img
              className={styles.arrowIcon}
              src="img/icons/arrow-back.svg"
              alt="arrow-back"
            />
            <span>Back to home</span>
          </div>
        </a>
      </div>

      <h1 className={styles.notFoundMessage}>Page not found</h1>
      <img
        className={styles.notFoundImg}
        src="img/page-not-found.png"
        alt="Page not found"
      />
    </div>
  );
};
