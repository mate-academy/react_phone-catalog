import React from 'react';
import { BASE_URL } from '../../helpers/constants';
import { Category } from '../../types';
import './NoProducts.scss';

type Props = {
  products: Category;
  isQuery?: boolean;
};

export const NoProducts: React.FC<Props> = ({ products, isQuery = false }) => (
  <div className="no-products">
    <img
      src={`${BASE_URL}/img/product-not-found.png`}
      alt="products were not found"
      className="no-products__image"
    />

    <h2 className="no-products__title">
      {isQuery ? (
        `There are no ${products} matching the query`
      ) : (
        `There are no ${products} matching yet`
      )}
    </h2>
  </div>
);

NoProducts.defaultProps = {
  isQuery: false,
};
