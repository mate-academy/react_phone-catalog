import React from 'react';
import styles from './HotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.notfoundpage}>
      <h1 className={styles.notfoundpage__title}>Page not found</h1>
      <div className={styles.notfoundpage__img}>
        <img src="./img/page-not-found.png" alt="page not found" />
      </div>
    </div>
  );
};

export default NotFoundPage;
