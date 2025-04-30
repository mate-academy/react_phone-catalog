import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import arrow from 'assets/img/icons/arrow-down-dark-gray.svg';
import homeIcon from 'assets/img/icons/home.svg';

import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split('/').filter(Boolean);

  const buildPath = (index: number) =>
    `/${pathnames.slice(0, index + 1).join('/')}`;

  return (
    <nav className={styles.container}>
      <ul className={styles.breadcrumbs}>
        <li className={styles.breadcrumbItem}>
          <Link className={styles.homeLink} to="/">
            <img alt="home" src={homeIcon} />
          </Link>
        </li>

        {pathnames.map((name, index) => {
          const isLast = index === pathnames.length - 1;
          const path = buildPath(index);

          return (
            <React.Fragment key={path}>
              <li className={styles.icon}>
                <img alt="arrow" className={styles.arrow} src={arrow} />
              </li>

              <li
                className={`${styles.breadcrumbItem} ${isLast ? styles.currentBreadcrumb : ''}`}
              >
                {isLast ? (
                  <span>{name}</span>
                ) : (
                  <Link className={styles.link} to={`/${name}`}>
                    {name}
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
