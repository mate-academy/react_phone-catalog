import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((path) => path !== '');

  paths.unshift('/');

  return (
    <div className="breadcrumbs">
      {paths.map((path, index) => (
        <div className="breadcrumbs__part" key={path}>
          {index > 0 && (
            <span className="breadcrumbs__separator">
              <img
                src="./img/icons/arrow-gray.svg"
                alt="arrow"
                className="breadcrumbs__right-arrow"
              />
            </span>
          )}
          {index === paths.length - 1 ? (
            <span className="breadcrumbs__current">
              {path.charAt(0).toUpperCase()
                + path.slice(1).split('-').join(' ')}
            </span>
          ) : (
            <>
              {path === '/' ? (
                <Link to={path} className="icon icon--home" />
              ) : (
                <Link to={`/${path}`} className="breadcrumbs__link">
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </Link>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};
