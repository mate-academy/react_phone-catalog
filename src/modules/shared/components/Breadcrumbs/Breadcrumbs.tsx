import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { HomeIcon, ArrowUpIcon } from '../Icons';
import styles from './Breadcrumbs.module.scss';
import { useBreadcrumbs } from './useBreadcrumbs';

export const Breadcrumbs: React.FC = () => {
  const { breadcrumbs, isHome } = useBreadcrumbs();

  if (isHome) {
    return null;
  }

  return (
    <nav className={styles.breadcrumbs} aria-label="breadcrumb">
      <Link to="/" className={styles.homeLink}>
        <span className="icon">
          <HomeIcon />
        </span>
      </Link>

      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <React.Fragment key={crumb.path}>
            <span className={classNames(styles.separator, 'icon icon--right')}>
              <ArrowUpIcon />
            </span>

            {isLast ? (
              <span className={styles.current}>{crumb.name}</span>
            ) : (
              <Link to={crumb.path} className={styles.link}>
                {crumb.name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
