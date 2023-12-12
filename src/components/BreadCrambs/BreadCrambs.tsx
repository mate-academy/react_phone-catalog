import React from 'react';
import './BreadCrambs.scss';
import { Link, useLocation } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';

interface Props {
  product?: ProductDetails | null,
}

function capitalizeCategory(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}

export const BreadCrambs: React.FC<Props> = ({ product }) => {
  const { pathname } = useLocation();
  const categoryName = pathname.slice(1).split('/')[0];

  return (
    <div className="breadCrambs" data-cy="breadCrumbs">
      <Link to="/" className="breadCrambs__link--home">
        <div className="icon icon--home" />
      </Link>

      <div className="icon icon--right" />

      {!product ? (
        <span className="breadCrambs__current">
          {capitalizeCategory(categoryName)}
        </span>
      ) : (
        <>
          <Link to={`/${categoryName}`} className="breadCrambs__link">
            {capitalizeCategory(categoryName)}
          </Link>

          <div className="icon icon--right" />

          <span className="breadCrambs__current">
            {product.name}
          </span>
        </>
      )}
    </div>
  );
};

BreadCrambs.defaultProps = {
  product: null,
};
