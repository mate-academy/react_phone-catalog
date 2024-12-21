import React from 'react';
import styles from './NotFound.module.scss';

export const NotFound: React.FC = () => {
  return (
    <div className={`page__not-found ${styles['not-found']}`}>
      <div className={styles['not-found__container']}>
        <div className={styles['not-found__image']}>
          <img src="/img/page-not-found.png" alt="Not Found 404"></img>
        </div>
      </div>
    </div>
  );
};
