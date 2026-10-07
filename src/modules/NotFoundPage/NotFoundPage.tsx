import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <section className={styles.not_faund_page}>
      <h1 className={styles.not_faund_page__title}>Page not found</h1>
      <Link to={'/'} className={styles.not_faund_page__link}>
        Back to home
      </Link>

      <img
        className={styles.not_faund_page__img}
        src="/img/page-not-found.png"
        alt="Page not found"
      />
    </section>
  );
};
