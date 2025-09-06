import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ul className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>
          <Link to="/" className={styles.breadcrumbs__link}>
            <img
              src="/img/Icons/Buttons/Icons/home.svg"
              alt="Home"
              className={styles.breadcrumbs__icon}
            />
          </Link>
        </li>

        {pathnames.map((segment, index) => {
          const to = '/' + pathnames.slice(0, index + 1).join('/');
          const isLast = index === pathnames.length - 1;

          return (
            <React.Fragment key={to}>
              <li className={styles.breadcrumbs__separator}>
                <img
                  src="/img/Icons/Buttons/Icons/arrow-right.svg"
                  alt=""
                  aria-hidden="true"
                  className={styles.breadcrumbs__arrow}
                />
              </li>

              <li className={styles.breadcrumbs__item}>
                {isLast ? (
                  <span className={styles.breadcrumbs__current}>
                    {decodeURIComponent(segment)}
                  </span>
                ) : (
                  <Link to={to} className={styles.breadcrumbs__link}>
                    {decodeURIComponent(segment)}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};
