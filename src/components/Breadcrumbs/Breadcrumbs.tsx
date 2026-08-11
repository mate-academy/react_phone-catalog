import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
  currentPath: React.ReactNode;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentPath }) => {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <Link to="/" className={styles.breadcrumbs__homeLink}>
        <img
         src="/react_phone-catalog/img/icons/house.svg"
          alt="Home page"
          className={styles.breadcrumbs__icon}
        />
      </Link>

      <img
       src="/react_phone-catalog/img/icons/arrowIcon.svg"
        alt=""
        className={styles.breadcrumbs__arrow}
        aria-hidden="true"
      />

      <span className={styles.breadcrumbs__current}>{currentPath}</span>
    </nav>
  );
};
