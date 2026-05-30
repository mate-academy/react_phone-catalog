import { BackButton } from '../../components/BackButton';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <BackButton />

      <div className={styles.page__container}>
        <h1>Page not found</h1>

        <img
          className={styles.page__img}
          src="../../../public/img/page-not-found.png"
          alt="Page not found image"
        />
      </div>
    </div>
  );
};
