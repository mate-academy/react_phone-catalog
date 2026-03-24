import React from 'react';
import cl from 'classnames';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={cl('container', styles.imgWrapper)}>
    <img
      src={`${import.meta.env.BASE_URL}/img/page-not-found.png`}
      alt="Page not found - photo"
      className={styles.img}
    />
  </div>
);
