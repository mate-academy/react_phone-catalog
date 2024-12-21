import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  let currentLink = '';

  const crumbs = location.pathname
    .split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentLink += `/${crumb}`;

      return (
        <div key={crumb} className={styles.breadcrumbs__crumb}>
          <Link to={currentLink}>{crumb}</Link>
        </div>
      );
    });

  return (
    <div className={`page__breadcrumbs ${styles.breadcrumbs}`}>
      <div className={styles.breadcrumbs__container}>
        <div className={styles.breadcrumbs__crumb}>
          <Link to={'/'}>
            <img src="/img/icons/home.svg" alt="Home"></img>
          </Link>
        </div>

        {crumbs}
      </div>
    </div>
  );
};
