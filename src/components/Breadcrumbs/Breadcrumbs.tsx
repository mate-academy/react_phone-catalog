import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Breadcrumbs.scss';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  const path = location.pathname;

  const segments = path.split('/').filter(Boolean);

  return (
    <>
      <div className="breadcrumbs">
        <Link to="/" className="breadcrumbs__home">
          <img src="/img/icons/home.svg" alt="home image" />
        </Link>

        {segments.map((segment, i) => {
          const link = '/' + segments.slice(0, i + 1).join('/');
          const isLast = i === segments.length - 1;

          return (
            <span key={link} className="breadcrumbs__item">
              <img
                src="/img/icons/arrow-right.svg"
                alt="arrow"
                className="breadcrumbs__arrow"
              />
              <Link
                to={link}
                className={`breadcrumbs__link ${isLast ? 'breadcrumbs__link--active' : ''}`}
              >
                {segment}
              </Link>
            </span>
          );
        })}
      </div>
    </>
  );
};
