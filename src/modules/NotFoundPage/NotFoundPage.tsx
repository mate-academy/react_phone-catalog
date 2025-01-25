import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.back}>
        <a href="/">
          <div className={styles.backContainer}>
            <img
              className={styles.arrowIcon}
              src="img/icons/arrow-down-light-gray.svg"
              alt="arrow-back"
            />
            Back to home
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
