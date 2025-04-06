import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFound_text}>Page not found</h1>
      <img
        className={styles.notFound_img}
        src={`${import.meta.env.BASE_URL}/img/page-not-found.png`}
        alt="age-not-found"
      />
    </div>
  );
};
