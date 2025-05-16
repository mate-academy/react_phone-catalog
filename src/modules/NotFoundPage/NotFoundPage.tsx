import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.container}>
        <h1>404</h1>
        <p>Oops! The page you’re looking for doesn’t exist.</p>
        <Link to="/" className={styles.homeLink}>
          Take Me Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
