import styles from './notFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.error}>
      <div className={styles.error__message}>
        <h1 className={styles.error__title}>404</h1>
        <p className={styles.error__item}>
          The page you are looking for does not exist
        </p>
      </div>

      <img
        className={styles.error__image}
        src={`${import.meta.env.BASE_URL}/img/error-not-page.png`}
        alt="image product not found"
      />
    </div>
  );
};
