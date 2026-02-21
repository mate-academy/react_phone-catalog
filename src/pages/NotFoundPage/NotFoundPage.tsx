import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

const NotFoundPage: React.FC = () => {
  return (
    <section className={styles.notFoundPage}>
      <div className={styles.notFoundPage__content}>
        <img
          src="/react_phone-catalog/img/page-not-found.png"
          alt="Page not found"
          className={styles.notFoundPage__image}
        />
        <h1 className={styles.notFoundPage__title}>Page Not Found</h1>
        <p className={styles.notFoundPage__text}>
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className={styles.notFoundPage__link}>
          Go to Home Page
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
