import React from 'react';
import './NoResults.scss';
import { ProductsType } from '../../types/ProductsType';

type Props = {
  type: ProductsType;
};

export const NoResults: React.FC<Props> = ({ type }) => {
  return <div className="noResults">{`${type} not found`}</div>;
};
