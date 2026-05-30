import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.not_found}>
      <h1 className={styles.not_found__title}>Page Not Found</h1>
      <div className={styles.not_found__image}></div>
    </div>
  );
};
