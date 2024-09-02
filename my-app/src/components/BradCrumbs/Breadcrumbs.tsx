import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './BreadCrumbs.module.scss';

type Props = {
  details?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ details }) => {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);
  const category = segments[0] || '';
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <nav aria-label="Breadcrumb" className={styles.container}>
      <NavLink to="/" className={styles.homeIcon} aria-label="Home"></NavLink>
      {category && (
        <>
          <span className={styles.arrowIcon} />
          <NavLink
            to={`/${category}`}
            className={details ? styles.breadcrumbLink : styles.breadcrumb}
            aria-disabled={!details}
          >
            {categoryLabel}
          </NavLink>
        </>
      )}
      {details && (
        <>
          <span className={styles.arrowIcon} />
          <span className={styles.breadcrumb}>{details}</span>
        </>
      )}
    </nav>
  );
};
