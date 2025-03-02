import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbs__icon}></Link>

      {pathnames.map((pathname, index) => {
        const isLast = index === pathnames.length - 1;
        const path = `/${pathnames.slice(0, index + 1).join('/')}`;

        const finalPathname = pathname
          .split('-')
          .map(name => name.charAt(0).toUpperCase() + name.slice(1))
          .join(' ');

        return (
          <React.Fragment key={path}>
            <span className={styles.breadcrumbs__separator}></span>

            {isLast ? (
              <span
                className={`${styles.breadcrumbs__item} ${styles['breadcrumbs__item--active']}`}
              >
                {decodeURIComponent(finalPathname)}
              </span>
            ) : (
              <Link to={path} className={styles.breadcrumbs__item}>
                {decodeURIComponent(finalPathname)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
