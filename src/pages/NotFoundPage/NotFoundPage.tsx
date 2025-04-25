import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <h2 className={styles.notFoundPage__message}>Page not found...</h2>
    </div>
  );
};

export default NotFoundPage;
