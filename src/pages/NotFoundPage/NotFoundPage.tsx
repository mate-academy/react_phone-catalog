import styles from './NotFoundPage.styles.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>Not Found Page</h1>
      <img
        className={styles.image}
        src="../img/page-not-found.png"
        alt="Image page not found"
      />
    </div>
  );
};
