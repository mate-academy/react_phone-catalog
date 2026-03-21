import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

import notFoundImage from '@/assets/img/PageNotFound.png';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <img src={notFoundImage} alt="Page not found" className={styles.image} />
      <h1 className={styles.title}>Page not found</h1>
      <Link to="/" className={styles.link}>
        Back to Home
      </Link>
    </div>
  );
};
