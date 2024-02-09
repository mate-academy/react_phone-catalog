import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/PathLink.scss';

export const PathLink: React.FC = () => {
  const { pathname } = useLocation();
  const category = `${pathname[1].toUpperCase()}${pathname.slice(2)}`;

  return (
    <div className="PathLink">
      <Link to="/" className="PathLink__home">
        <div className="PathLink__home-icon" />
      </Link>

      <div className="PathLink__arrow-right" />

      <Link to="/phones" className="PathLink__category">
        {category}
      </Link>
    </div>
  );
};
