import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import GoBackButton from '../GoBackButton';
import './BreadCrumb.scss';

export const BreadCrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <div className="bread-crumb">
      {pathnames.length > 0 && (
        <div className="bread-crumb__list">
          <Link to="/" className="bread-crumb__item bread-crumb__home">
            <img
              src="./icons/Home.svg"
              alt="Home"
              className="bread-crumb__icon"
            />
            <img
              src="./icons/arrow-right--gray.svg"
              className="bread-crumb__icon"
            />
          </Link>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

            return (
              <Link key={to} to={to} className="bread-crumb__item paragraph">
                {index > 0 && (
                  <img
                    src="./icons/arrow-right--gray.svg"
                    className="bread-crumb__icon"
                  />
                )}
                {decodeURIComponent(value).replace(/-/g, ' ')}
              </Link>
            );
          })}
        </div>
      )}
      {pathnames.length > 1 && <GoBackButton />}
    </div>
  );
};
