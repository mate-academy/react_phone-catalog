import styles from './NotFoundPage.module.scss';
import NotFoundImg from '../../assets/images/product-not-found.png';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__content}>
        <h1 className={styles.notFound__title}>Page not found</h1>

        <div className={styles.notFound__photo}>
          <img
            src={NotFoundImg}
            alt="Page not Found"
            className={styles.notFound__img}
          />
        </div>
      </div>
    </div>
  );
};
