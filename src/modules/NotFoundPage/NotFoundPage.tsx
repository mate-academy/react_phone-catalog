import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.not__found}>
      <h1>Page not found</h1>

      <div>
        <img
          src=".img/page-not-found.png"
          alt="not-found-page-img"
          className={styles.not__found__img}
        ></img>
      </div>
    </div>
  );
};
