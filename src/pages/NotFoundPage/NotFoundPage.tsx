import React from 'react';
import { Link } from 'react-router-dom';
import { GoBackBttn } from '../../components/GoBackBttn';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className="breadcrumbs">
        <a href="/" className="breadcrumbs__home" aria-label="Home"></a>
        <span className="breadcrumbs__arrow"></span>
        <span className="breadcrumbs__route breadcrumbs__route--last">Page not found</span>
      </div>

      <div className={styles.notFoundPage__content}>
        <h1 className={styles.notFoundPage__title}>404</h1>
        <h2 className={styles.notFoundPage__subtitle}>Page not found</h2>
        <p className={styles.notFoundPage__description}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className={styles.notFoundPage__image}>
          <img
            src="./img/product-not-found.png"
            alt="Page not found"
            className={styles.notFoundPage__image_img}
          />
        </div>

        <div className={styles.notFoundPage__actions}>
          <GoBackBttn />
          <Link to="/" className={styles.notFoundPage__homeLink}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}; 