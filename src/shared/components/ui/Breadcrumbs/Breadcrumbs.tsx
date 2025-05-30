import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Icon } from '../Icon/Icon';
import { IconNames } from '../Icon/IconNames';

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
            <Icon name={IconNames.Home} />
          </Link>
        </li>

        {pathnames.map((name, index) => {
          const isLast = index === pathnames.length - 1;
          const path = buildPath(index);

          return (
            <React.Fragment key={path}>
              <Icon className={styles.arrowIcon} name={IconNames.Arrow} />

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
