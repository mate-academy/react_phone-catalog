import React from 'react';
import { BASE_URL } from '../../helpers/constants';
import './NoProducts.scss';

type Props = {
  title: string;
};

export const NoProducts: React.FC<Props> = ({ title }) => (
  <div className="no-products">
    <img
      src={`${BASE_URL}/img/product-not-found.png`}
      alt="products were not found"
      className="no-products__image"
    />

    <h2 className="no-products__title">
      {title}
    </h2>
  </div>
);
