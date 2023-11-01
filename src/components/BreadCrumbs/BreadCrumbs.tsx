import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './BreadCrumbs.scss';

type Props = {
  productName?: string;
};

export const BreadCrumbs: React.FC<Props> = ({ productName = '' }) => {
  const capitalize = (string: string) => {
    return string.slice(0, 1).toUpperCase() + string.slice(1);
  };

  const { pathname } = useLocation();
  const directory = capitalize(pathname.split('/')[1]);

  return (
    <div data-cy="breadCrumbs" className="breadCrumbs">
      <Link to="/" className="breadCrumbs__icon breadCrumbs__home">
        {' '}
      </Link>

      <p className="breadCrumbs__icon breadCrumbs__arrow">
        {' '}
      </p>

      {!productName ? (
        <p className="breadCrumbs__category">
          {directory}
        </p>
      ) : (
        <Link to={`/${directory}`} className="breadCrumbs__link">
          {directory}
        </Link>
      )}

      {productName && (
        <>
          <p className="breadCrumbs__icon breadCrumbs__arrow">{' '}</p>
          <p className="breadCrumbs__category">{productName}</p>
        </>
      )}
    </div>
  );
};
