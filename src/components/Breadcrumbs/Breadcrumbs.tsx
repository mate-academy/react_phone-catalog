import React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../../images/icons/Home.svg';
import './Breadcrumbs.scss';

export const Breadcrumbs: React.FC = () => {
  return (
    <div className="Breadcrumbs">
      <Link to="/" className="Breadcrumbs__home">
        <img
          src={homeIcon}
          alt="Home"
          className="Breadcrumbs__home-img"
        />
      </Link>

      <div className="Breadcrumbs__arrow" />
      <p className="Breadcrumbs__page-title">Phones</p>
    </div>
  );
};
