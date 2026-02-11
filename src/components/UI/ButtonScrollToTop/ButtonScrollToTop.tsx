import React from 'react';

import styles from './ButtonScrollToTop.module.scss';

type Props = {
  label?: string;
};

export const ButtonScrollToTop: React.FC<Props> = ({ label = '' }) => {
  return (
    <div className={styles['btn-scroll-top__wrapper']}>
      {label && (
        <p className="main-text main-text--sm main-text--secondary">{label}</p>
      )}

      <a
        href="#"
        className={`button-box button-box--sm button--arrow-top ${styles['btn-scroll-top']}`}
      ></a>
    </div>
  );
};
