import React from 'react';
import styles from './NotFoundPage.module.scss';
import NotFoundImg from '/img/page-not-found.png';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.not_found_page}>
      <h2 className="secondary-title">Page not Found</h2>

      <img
        className={styles.not_found_page__image}
        src={NotFoundImg}
        alt="404 Error"
      />
    </div>
  );
};
