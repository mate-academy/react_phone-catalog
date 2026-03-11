import React from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => (
  <div className={styles['not-found-page']}>
    <div className={styles['not-found-page__container']}>
      <h3 className={styles.title}>Page not found</h3>
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbs__link}>
          <img
            src="img/icons/home.png"
            className={styles.breadcrumbs__icon}
            alt="Home"
          />
        </Link>

        <div className={styles.breadcrumbs__separator}></div>

        <h4 className={styles.breadcrumbs__current}>Back home</h4>
      </div>
      <img className={styles.image} src="img/page-not-found.png" alt="" />
    </div>
  </div>
);
