import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <section className={styles.notFound}>
      <div className={styles.notFound__content}>
        <h1 className={styles.notFound__title}>Page not found</h1>
        <img
          src="public/img/page-not-found.png"
          alt="Page not found photo"
          className={styles.notFound__photo}
        />
        <Link to="/" className={styles.notFound__link}>
          Back to home
        </Link>
      </div>
    </section>
  );
};
