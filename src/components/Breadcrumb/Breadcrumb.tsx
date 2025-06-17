import React from 'react';
import styles from './Breadcrumb.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  current: string;
}

export const Breadcrumb: React.FC<Props> = ({ current }) => {
  return (
    <div className={styles.breadcrumb}>
      <Link to="/" className={styles.homeLink}>
        <img
          src="/react_phone-catalog/img/icons/home.svg"
          alt="Home"
          className={styles.homeIcon}
        />
      </Link>
      <img
        src="/react_phone-catalog/img/icons/arrow-right.svg"
        alt="Arrow"
        className={styles.arrowIcon}
      />
      <span className={styles.currentPage}>{current}</span>
    </div>
  );
};
