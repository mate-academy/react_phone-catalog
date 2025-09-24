import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.page404}>
      <span>Page not found :(</span>
      <a href="/">Go to homepage 🔗</a>
      <img
        src="./img/page-not-found.png"
        alt="Page not found"
        className={styles.page404__image}
      />
    </div>
  );
};
