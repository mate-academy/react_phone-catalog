import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowIcon, HomeIcon } from '@/shared/assets/icons';

import cn from 'classnames';
import './BreadcrumbsNav.scss';

type Props = {
  productName?: string;
  className?: string;
  isLoading?: boolean;
};

export const BreadcrumbsNav: React.FC<Props> = ({
  productName,
  className = '',
  isLoading,
}) => {
  const location = useLocation();

  const pathName = location.pathname.split('/').filter(Boolean);

  const categoryPathName = pathName[0];

  const categoryName = categoryPathName
    ? categoryPathName.charAt(0).toUpperCase() + categoryPathName.slice(1)
    : '';

  if (isLoading || !categoryName) {
    return (
      <nav
        className={`breadcrumbs ${className}`.trim()}
        aria-label="breadcrumbs loading"
        aria-hidden="true"
      >
        <div className="breadcrumbs__skeleton" />
      </nav>
    );
  }

  return (
    <nav className={cn('breadcrumbs', className)} aria-label="breadcrumbs">
      <ol className="breadcrumbs__list">
        {/* home page */}
        <li className="breadcrumbs__item">
          <Link to="/" className="breadcrumbs__link" aria-label="Home">
            <HomeIcon className="breadcrumbs__icon breadcrumbs__icon--home" />
          </Link>
          <ArrowIcon className="breadcrumbs__icon" aria-hidden="true" />
        </li>
        {/* category name */}
        <li className="breadcrumbs__item">
          {productName ? (
            <>
              <Link
                to={`/${categoryPathName}`}
                className="breadcrumbs__link breadcrumbs__link--page-name"
              >
                {categoryName}
              </Link>
              <ArrowIcon className="breadcrumbs__icon" aria-hidden="true" />
            </>
          ) : (
            <span className="breadcrumbs__current">{categoryName}</span>
          )}
        </li>

        {productName && (
          <li className="breadcrumbs__item">
            <span className="breadcrumbs__current">{productName}</span>
          </li>
        )}
      </ol>
    </nav>
  );
};
