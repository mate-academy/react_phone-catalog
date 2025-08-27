import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import cn from 'classnames';

import './Breadcrumbs.scss';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const content = pathname.includes('/product/')
    ? pathname.replaceAll('/product', ' ').split(' ')
    : pathname.split(' ');

  const getLinkName = (data: string) => {
    const clean = data.replace(/^[:/]+/, '');

    return clean[0].toUpperCase() + clean.slice(1);
  };

  const getClass = ({ isActive }: { isActive: boolean }) => {
    return cn('breadcrumbs__item', { 'breadcrumbs__item--active': isActive });
  };

  return (
    <div className="breadcrumbs breadcrumbs--margin-top">
      <NavLink end className={getClass} to={'/home'}>
        <img src="./img/icons/Home.svg" alt="home" />
      </NavLink>

      {content.map(link => (
        <React.Fragment key={link}>
          <img
            className="breadcrumbs__item"
            src="./img/icons/arrow-right.svg"
            alt=""
          />

          <NavLink
            end
            className={getClass}
            to={link === content[0] ? link : location.pathname}
          >
            <div> {getLinkName(link)} </div>
          </NavLink>
        </React.Fragment>
      ))}
    </div>
  );
};
