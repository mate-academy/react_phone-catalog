import React from 'react';
import { Link } from 'react-router-dom';

import './Breadcrumbs.scss';

interface BreadcrumbsProps {
  items: { [key: string]: string };
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className="breadcrumbs" data-cy="breadCrumbs">
      <Link to="/" className="breadcrumbs__link breadcrumbs__link--home" />
      {Object.entries(items).map(([key, value]) => (
        <Link key={key} to={`${value}`} className="breadcrumbs__link">
          {key}
        </Link>
      ))}
    </div>
  );
};

export default Breadcrumbs;
