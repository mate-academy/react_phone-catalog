import { Link, useLocation } from 'react-router-dom';
import styles from './BreadCrumbs.module.scss';
import React from 'react';

export const BreadCrumbs = () => {
  const location = useLocation();

  let currentLink = '';

  const crumbs = location.pathname
    .split('/')
    .filter(crumb => crumb !== '')
    .map((crumb, index, array) => {
      currentLink += `/${crumb}`;

      const crumbText = crumb.charAt(0).toUpperCase() + crumb.slice(1);
      const isLast = index === array.length - 1;

      return (
        <React.Fragment key={crumb}>
          {index === 0 && (
            <div className={styles.breadcrumbs__first}>
              <Link className={styles.breadcrumbs__home} to="/">
                <img
                  className={styles.breadcrumbs__home_img}
                  src="img/icons/home.svg"
                  alt=""
                />
              </Link>

              <img src="img/icons/vector.svg" alt="" />
            </div>
          )}

          <Link className={styles.breadcrumbs__crumb} to={currentLink}>
            {crumbText}
          </Link>

          {!isLast && <img src="img/icons/vector.svg" alt="" />}
        </React.Fragment>
      );
    });

  return (
    <>
      <div className={styles.breadcrumbs}>
        <div className={styles.breadcrumbs__content}>{crumbs}</div>
      </div>
    </>
  );
};
