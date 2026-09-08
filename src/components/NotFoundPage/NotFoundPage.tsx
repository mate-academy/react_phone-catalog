import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <section className={styles['not-found-page']}>
      <img
        className={styles['not-found-page__img']}
        src="./img/page-not-found.png"
        alt="Page-Not-Found"
      />
    </section>
  );
};
