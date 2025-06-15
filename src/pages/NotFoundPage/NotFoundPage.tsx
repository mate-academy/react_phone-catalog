import styles from './NotFoundPage.module.scss';
import pageNotFoundImg from '../../assets/img/page-not-found.png';

export const NotFoundPage = () => (
  <div className={styles.pageNotFound}>
    <p className={styles.pageNotFound__text}>Page not found</p>
    <img
      src={pageNotFoundImg}
      alt="page-not-found.png"
      className={styles.pageNotFound__img}
    />
  </div>
);
