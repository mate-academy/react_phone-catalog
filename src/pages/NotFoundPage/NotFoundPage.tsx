import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

import { getAssetUrl } from '../../utils/helpers';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Page Not Found | Gadgets';
  }, []);

  return (
    <div
      className={`${styles.notFoundPage} container`}
      data-testid="not-found-page"
    >
      <img
        src={getAssetUrl('img/page-not-found.png')}
        alt="Page not found"
        className={styles.image}
      />
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.text}>
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link to="/" className={styles.homeBtn}>
        Go to Home
      </Link>
    </div>
  );
};
