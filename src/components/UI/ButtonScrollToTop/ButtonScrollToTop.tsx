import React from 'react';

import styles from './ButtonScrollToTop.module.scss';

export const ButtonScrollToTop = () => {
  return (
    <div className={styles['btn-scroll-top__wrapper']}>
      <p className="main-text main-text--sm main-text--secondary">
        Back to top
      </p>
      <a
        href="#"
        className={`button-box button-box--sm button--arrow-top ${styles['btn-scroll-top']}`}
      ></a>
    </div>
  );
};
