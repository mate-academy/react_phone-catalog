import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  lastTitle?: string;
}

export const Breadcrumbs = ({ lastTitle }: Props) => {
  const { pathname } = useLocation();
  const pathnameArr = ['/', ...pathname.split('/').filter(el => el)];

  if (lastTitle) {
    pathnameArr.pop();
    pathnameArr.push(lastTitle);
  }

  return (
    <div className={styles.breadcrumbs}>
      {pathnameArr.map((path, i) => {
        const isHome = path === '/';
        const normalizePath = path.charAt(0).toUpperCase() + path.slice(1);

        if (i === pathnameArr.length - 1) {
          return (
            <p
              key={i}
              className={`${styles.breadcrumbs__item} ${styles.active}`}
            >
              {normalizePath}
            </p>
          );
        }

        const pathSegments = lastTitle ? pathnameArr.slice(0, -1) : pathnameArr;

        const linkPath = isHome
          ? '/'
          : '/' + pathSegments.slice(1, i + 1).join('/');

        return (
          <React.Fragment key={i}>
            <Link
              to={linkPath}
              className={classNames(styles.breadcrumbs__item, {
                'icon icon--home': isHome,
              })}
            >
              {!isHome && normalizePath}
            </Link>
            <span
              className={`icon icon--arrow-right ${styles.breadcrumbs__arrow}`}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};
