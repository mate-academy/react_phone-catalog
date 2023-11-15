import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BreadCrumbs.scss';
import { capitalize } from '../../helpers/helpers';
import { ProductDetails } from '../../types/ProductDetalis';

type Props = {
  product?: ProductDetails | null,
};

export const BreadCrumbs: React.FC<Props> = ({ product }) => {
  const { pathname } = useLocation();
  const caregoryName = pathname.slice(1).split('/')[0];

  return (
    <div className="BreadCrumbs" data-cy="breadCrumbs">
      <Link to="/" className="BreadCrumbs__link-home">
        <div className="icon icon--home" />
      </Link>

      <div className="icon icon--bread-crumb" />

      {!product ? (
        <span className="BreadCrumbs__current">
          {capitalize(caregoryName)}
        </span>
      ) : (
        <>
          <Link to={`/${caregoryName}`} className="BreadCrumbs__link">
            {capitalize(caregoryName)}
          </Link>

          <div className="icon icon--bread-crumb" />

          <span className="BreadCrumbs__current">
            {product.name}
          </span>
        </>
      )}
    </div>
  );
};

BreadCrumbs.defaultProps = {
  product: null,
};
