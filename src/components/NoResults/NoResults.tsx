import React from 'react';

import { ProductsType } from '../../types/ProductsType';

import './NoResults.scss';

type Props = {
  type: ProductsType;
};

export const NoResults: React.FC<Props> = ({ type }) => {
  return <div className="noResults">{`${type} not found`}</div>;
};
