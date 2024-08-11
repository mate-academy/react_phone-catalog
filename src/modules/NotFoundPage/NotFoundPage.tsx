import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <img
        className={styles.notFoundImg}
        src="img/notFound.jpg"
        alt="Not Found"
      />
    </div>
  );
};
