import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className="breadcrumbs">
      <Link to="/" className="breadcrumbs__home-link">
        <span className="breadcrumbs__home-icon"></span>
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="breadcrumbs__separator"></span>

          {item.link ? (
            <Link to={item.link} className="breadcrumbs__link">
              {item.label}
            </Link>
          ) : (
            <span className="breadcrumbs__current">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
