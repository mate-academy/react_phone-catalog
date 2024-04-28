import useBreadcrumbs from 'use-react-router-breadcrumbs';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { icons } from '../../shared/global/Icons';
import styles from './BreadCrumbs.module.scss';
import classNames from 'classnames';

export const BreadCrumbs = () => {
  const breadcrumbs = useBreadcrumbs();
  const currentPath = useLocation().pathname;

  return (
    <nav className={styles.breadCrumbs}>
      {breadcrumbs.map(({ match, breadcrumb }, index) => (
        <React.Fragment key={match.pathname}>
          {index > 0 && (
            <span className={styles.iconBreadCrumb}>{icons.arrowRightDis}</span>
          )}
          <Link
            to={match.pathname}
            className={classNames(styles.linkBreadCrumb, {
              [styles.linkBreadCrumbDis]: match.pathname !== currentPath,
            })}
          >
            {match.pathname === '/' ? (
              <span
                className={classNames(styles.iconBreadCrumb, {
                  [styles.breadcrumbActive]: location.pathname === '/',
                  [styles.breadcrumbNotActive]: location.pathname !== '/',
                })}
              >
                {icons.home}
              </span>
            ) : (
              breadcrumb
            )}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};
