import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import style from './Breadcrumbs.module.scss';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const segments = path.split('/').filter(Boolean);
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className={style.breadcrumbs}>
      <Link to="/" className={style.breadcrumbsHome}>
        <img src="img/icons/Home.svg" alt="home image" />
      </Link>

      {segments.map((segment, i) => {
        const link = '/' + segments.slice(0, i + 1).join('/');
        const isLast = i === segments.length - 1;

        return (
          <span key={link} className={style.breadcrumbsItem}>
            <img
              src="img/icons/Chevron (Arrow Right).svg"
              alt="arrow"
              className={style.breadcrumbsArrow}
            />
            <Link
              to={link}
              className={classNames(style.breadcrumbsLink, {
                [style.breadcrumbsLinkActive]: isLast,
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
