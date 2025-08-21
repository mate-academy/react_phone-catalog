import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const segments = path.split('/').filter(Boolean);
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbsHome}>
        <img src="/img/icons/home.svg" alt="home image" />
      </Link>

      {segments.map((segment, i) => {
        const link = '/' + segments.slice(0, i + 1).join('/');
        const isLast = i === segments.length - 1;

        return (
          <span key={link} className={styles.breadcrumbsItem}>
            <img
              src="/img/icons/arrow-right.svg"
              alt="arrow"
              className={styles.breadcrumbsArrow}
            />
            <Link
              to={link}
              className={classNames(styles.breadcrumbsLink, {
                [styles.breadcrumbsLinkActive]: isLast,
              })}
            >
              {capitalize(segment)}
            </Link>
          </span>
        );
      })}
    </div>
  );
};
