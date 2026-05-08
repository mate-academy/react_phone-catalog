import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { getAssetUrl } from '../../utils/getAssetUrl';

export const NotFoundPage = () => (
  <section className={styles.container}>
    <div className={styles.content}>
      <img
        src={getAssetUrl('img/page-not-found.png')}
        alt="Page not found"
        className={styles.image}
      />

      <p className={styles.label}>404 error</p>

      <h1 className={styles.title}>Page not found</h1>

      <p className={styles.text}>
        The page you are looking for does not exist or was moved.
      </p>

      <Link to="/" className={styles.home}>
        Back to Home
      </Link>
    </div>
  </section>
);
