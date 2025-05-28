import React from 'react';
import styles from './Breadcrumb.module.scss';

interface Props {
  current: string;
}

export const Breadcrumb: React.FC<Props> = ({ current }) => {
  return (
    <div className={styles.breadcrumb}>
      <img src="./img/icons/home.svg" alt="Home" className={styles.homeIcon} />
      <img
        src="./img/icons/arrow-right.svg"
        alt="Arrow"
        className={styles.arrowIcon}
      />
      <span className={styles.currentPage}>{current}</span>
    </div>
  );
};
