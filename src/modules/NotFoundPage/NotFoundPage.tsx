import React from 'react';
import { Link } from 'react-router-dom';
import { getPublicUrl } from '../../utils/publicPath';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => (
  <section className={styles.notFoundPage}>
    <h1 className={styles.notFoundPage__title}>Page not found</h1>
    <p className={styles.notFoundPage__text}>
      Go to{' '}
      <Link className={styles.notFoundPage__link} to="/">
        Home
      </Link>
      .
    </p>
    <img
      className={styles.notFoundPage__image}
      src={getPublicUrl('img/product-not-found.png')}
      alt="Page not found"
    />
  </section>
);
