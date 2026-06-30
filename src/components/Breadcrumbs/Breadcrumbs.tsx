import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbs__home}>
        <img src="icons/home.svg" alt="Home" className={styles.icon} />
      </Link>

      {pathnames.map((value, index) => {
        const title = value.charAt(0).toUpperCase() + value.slice(1);

        const isLast = index === pathnames.length - 1;

        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return (
          <React.Fragment key={to}>
            <span className={styles.breadcrumbs__separator}> {'>'} </span>

            {isLast ? (
              <span className={styles.breadcrumbs__current}>{title}</span>
            ) : (
              <Link to={to} className={styles.breadcrumbs__link}>
                {title}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
