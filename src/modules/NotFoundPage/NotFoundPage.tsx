/* eslint-disable max-len */
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notfound}>
      <div className={styles.notfound__wrapper}>
        <div className={styles.notfound__container}>
          <section className={styles.notfound__header}>
            <h1 className={styles.notfound__title}>Page not found</h1>
            <img src="./img/page-not-found.png" alt="404" className={styles.notfound__img} />
          </section>
        </div>
      </div>
    </div>
  );
};
