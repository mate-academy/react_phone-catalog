/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styles from './PageNotFound.module.scss';

export const PageNotFound: React.FC = () => {
  return (
    <div className={styles.background}>
      <div className={styles.error}>
        <h2 className={styles.title}>Page not found</h2>
        <div className={styles.text}>
          Sorry! We can&apos;t seem to find the page you&apos;re looking for.
          <br />
          Please check that the Web site address is spelled correctly.
        </div>
      </div>
    </div>
  );
};
