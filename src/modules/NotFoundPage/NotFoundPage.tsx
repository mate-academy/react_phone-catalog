import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

const pageNotFoundImageSrc = `${import.meta.env.BASE_URL}img/page-not-found.png`;

export const NotFoundPage = () => {
  return (
    <section className={styles.notFoundPage}>
      <div className={styles.content}>
        <h1 className={styles.title}>Page not found</h1>

        <img
          src={pageNotFoundImageSrc}
          alt="Page not found"
          className={styles.image}
        />

        <p className={styles.text}>
          The page you are looking for does not exist.
        </p>

        <Link to="/" className={styles.homeLink}>
          Go to home page
        </Link>
      </div>
    </section>
  );
};
