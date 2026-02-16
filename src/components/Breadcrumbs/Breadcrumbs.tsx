import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, HomeIcon } from '..';
import './Breadcrumbs.scss';
import { AppRoute } from '../../enums';

type BreadcrumbsProps = {
  productName?: string;
  className?: string;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  productName,
  className,
}) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(path => path);

  return (
    <nav className={`breadcrumbs ${className}`}>
      <Link to={AppRoute.HOME} className="breadcrumbs__link">
        <HomeIcon />
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={to}>
            <span className="breadcrumbs__separator">{<ArrowRight />}</span>
            {isLast && productName ? (
              <span className="breadcrumbs__text">{productName}</span>
            ) : isLast ? (
              <span className="breadcrumbs__text">
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </span>
            ) : (
              <Link to={to} className="breadcrumbs__link">
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
