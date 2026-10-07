import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const pageNotFoundImg = `${import.meta.env.BASE_URL}img/page-not-found.png`;

  return (
    <div className={styles.notfound__page}>
      <h1>404 - Page Not Found</h1>
      <div className={styles.img__wrapper}>
        <img
          src={pageNotFoundImg}
          width={300}
          height={200}
          alt="Page not found"
        />
      </div>
    </div>
  );
};
