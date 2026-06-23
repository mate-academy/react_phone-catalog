import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <section className={styles.page}>
    <div className={styles.card}>
      <img src="/img/page-not-found.png" alt="" className={styles.image} />
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.text}>
        The page you are looking for has moved or never existed.
      </p>
      <Link to="/" className={styles.link}>
        Go to HomePage
      </Link>
    </div>
  </section>
);
