import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <img
        src="/react_phone-catalog/img/page-not-found.png"
        alt="page-not-found"
        className={styles.image}
      />
    </div>
  );
};
