import React from 'react';
import styles from './NotFoundPage.module.scss';
import notFoundSrc from '../../assets/img/product-not-found.png';

const NotFoundPage = () => {
  return (
    <div className={styles.not_found}>
      <img src={notFoundSrc} alt="Not Found" />
    </div>
  );
};

export default NotFoundPage;
