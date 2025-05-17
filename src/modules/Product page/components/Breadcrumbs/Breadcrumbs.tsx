import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import React from 'react';
import { capitalize } from 'lodash';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const crumbs = location.pathname
    .split('/')
    .filter(Boolean)
    .map((crumb, index, array) => {
      const path = '/' + array.slice(0, index + 1).join('/');
      const label = capitalize(crumb);

      return (
        <span key={path} className={styles.breadcrumbs__element}>
          <Link to={path} className={styles.link}>
            {label}
          </Link>
          {index < array.length - 1 && (
            <span className={styles.separator}>
              <img src="./img/buttons/gray-arrow-right.svg" alt="separator" />
            </span>
          )}
        </span>
      );
    });

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/">
        <img src="./img/buttons/home.svg" alt="home" className={styles.link} />
      </Link>

      {crumbs.length > 0 && (
        <>
          {' '}
          <span className={styles.separator}>
            <img src="./img/buttons/gray-arrow-right.svg" alt="separator" />
          </span>
          {crumbs}
        </>
      )}
    </nav>
  );
};
