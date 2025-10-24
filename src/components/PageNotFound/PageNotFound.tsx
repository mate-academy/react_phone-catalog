import styles from './PageNotFound.module.scss';

export const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <img
        src="public\img\page-not-found.png"
        alt="Page Not Found"
        className={styles.container__image}
      />
    </div>
  );
};
