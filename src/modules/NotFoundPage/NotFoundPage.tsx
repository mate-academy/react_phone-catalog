import React from 'react';
import cl from 'classnames';

import CAT from '/img/page-not-found.png';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={cl('container', styles.imgWrapper)}>
    <img src={CAT} alt="Page not found - photo" className={styles.img} />
  </div>
);
