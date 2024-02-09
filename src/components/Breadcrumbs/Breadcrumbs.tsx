import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { v4 as getId } from 'uuid';

import './Breadcrumbs.scss';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const currentLocation = location.pathname.split('/').filter(path => (
    path !== ''
  ));

  let localPath = '';

  return (
    <div className="breadcrumbs">
      <Link to="/" className="breadcrumbs__home">
        <img src="img/icons/home.svg" alt="Home" />
      </Link>

      {currentLocation.map(path => {
        const newPath = path.split('-').map(p => (
          p.charAt(0).toUpperCase() + p.slice(1)
        )).join(' ');

        localPath += `/${path}`;

        return (
          <React.Fragment key={getId()}>
            <img
              className="breadcrumbs__arrow"
              src="img/icons/arrow-right.svg"
              alt="Arrow right"
            />

            <Link to={localPath} className="breadcrumbs__path">
              {newPath}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};
