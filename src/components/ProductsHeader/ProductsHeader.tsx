import React from 'react';
import { NavMap } from '../NavMap';

import './ProductsHeader.scss';

type Props = {
  title: string,
  length: number,
};

export const ProductsHeader: React.FC<Props> = ({ title, length }) => (
  <div className="products-header">
    <NavMap />

    <h1 className="products-header__title">
      {title}
    </h1>

    <p className="products-header__subtitle">
      {`${length} models`}
    </p>
  </div>
);
