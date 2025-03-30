import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  pathname: string;
  pageName: string;
}

export const Breadcrumb: React.FC<Props> = ({ pathname, pageName }) => {
  return (
    <div className="breadcrumb">
      <Link to="/" className="breadcrumb__link breadcrumb__link--home" />

      <div className="breadcrumb__arrow" />

      <Link to={pathname} className="breadcrumb__link">
        {pageName}
      </Link>
    </div>
  );
};
