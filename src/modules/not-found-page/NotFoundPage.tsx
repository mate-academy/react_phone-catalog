import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <h1>Page not found</h1>
      <img
        src="./img/page-not-found.png"
        alt="Page not found"
        className={styles.notFound__image}
      />
    </div>
  );
};
