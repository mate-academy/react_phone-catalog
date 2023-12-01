import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';

import './BreadCrumbs.scss';

type Props = {
  product?: ProductDetails | null,
};

export function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}

// eslint-disable-next-line react/require-default-props
export const BreadCrumbs:React.FC<Props> = ({ product = null }) => {
  const { pathname } = useLocation();
  const caregoryName = pathname.slice(1).split('/')[0];

  return (
    <div
      className="breadCrumbs"
      data-cy="breadCrumbs"
    >
      <Link to="/" className="breadCrumbs__link-home">
        <div className="icons icons--home" />
      </Link>

      <div className="icons icons--bread-crumb" />

      {!product ? (
        <span className="breadCrumbs__current">
          {capitalize(caregoryName)}
        </span>
      ) : (
        <>
          <Link to={`/${caregoryName}`} className="breadCrumbs__link">
            {capitalize(caregoryName)}
          </Link>

          <div className="icon icon--bread-crumb" />

          <span className="breadCrumbs__current">
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
