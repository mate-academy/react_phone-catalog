import notFoundPage from '/img/page-not-found.png';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <img
        src={notFoundPage}
        alt="Not found page"
        className={styles.notFoundPage_img}
      />
      <p className={styles.notFoundPage_message}>Page was not found</p>
    </div>
  );
};
