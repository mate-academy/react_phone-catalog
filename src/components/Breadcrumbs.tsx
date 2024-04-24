import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import homeIcon from '../images/icons/home-icon.svg';
import arrowIconDisable from '../images/icons/arrow-icon-disable.svg';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const pathnameArr = pathname.split('/').filter(item => item);

  return (
    <div className="flex items-center gap-2">
      <Link to="/" className="p-1">
        <img src={homeIcon} alt="Home Icon" />
      </Link>

      {pathnameArr.slice(1, -1).map(path => (
        <React.Fragment key={path}>
          <img
            src={arrowIconDisable}
            alt="Arrow Disable"
            className="rotate-90"
          />
          <Link to={`/${path}`} className="flex">
            <small className="first-letter:uppercase">{path}</small>
          </Link>
        </React.Fragment>
      ))}

      <img src={arrowIconDisable} alt="Arrow Disable" className="rotate-90" />

      <small className="text-secondary first-letter:uppercase">
        {pathnameArr.slice(-1).join('').replaceAll('-', ' ')}
      </small>
    </div>
  );
};
