import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <main className={styles['not-found-page']}>
      <p className={styles['not-found-page__msg']}>Page not found</p>
      <div className={styles['not-found-page__bg']}></div>
    </main>
  );
};
