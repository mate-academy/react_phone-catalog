import React from 'react';
import './BreadCrambs.scss';
import { Link } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';

interface Props {
  product?: ProductDetails | null,
  category: string,
}

export const BreadCrambs: React.FC<Props> = ({ product, category }) => {
  return (
    <div className="breadCrambs">
      <Link to="/" className="breadCrambs__link">
        <div className="icon icon--home" />
      </Link>

      <div className="icon icon--right" />

      {!product ? (
        <span className="breadCrambs__current">
          {category}
        </span>
      ) : (
        <>
          <Link to={`/${category}`} className="breadCrambs__link">
            {category}
          </Link>

          <div className="icon icon--right" />

          <span className="breadCrambs__current">
            {product?.name}
          </span>

        </>
      )}
    </div>
  );
};

BreadCrambs.defaultProps = {
  product: null,
};
