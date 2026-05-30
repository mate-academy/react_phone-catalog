import React from 'react';
import image from '../../../public/img/page-not-found.png';
import styles from './pageNotFound.module.scss';

export const NotFound: React.FC = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.page_title}>404: Page Not Found</h2>
      <img src={image} alt="page not found" className={styles.page_img} />
    </div>
  );
};
