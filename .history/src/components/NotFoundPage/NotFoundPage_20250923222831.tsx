/* eslint-disable max-len */
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notfoundpage}>
      <h1 className={styles.title}>Page not found</h1>
      <img src="public/img/page-not-found.png" alt="Page not found" className={styles.image} />
    </div>
  );
};
