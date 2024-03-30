import React from 'react';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { NoResults } from '../NoResults';
import { ProductsType } from '../../types/ProductsType';

import './ProductsList.scss';

type Props = {
  itemsList: Product[];
  type: ProductsType;
};

export const ProductsList: React.FC<Props> = ({ itemsList, type }) => {
  return itemsList.length !== 0 ? (
    <div className="productList" data-cy="productList">
      {itemsList.map(item => (
        <ProductCard key={item.id} product={item} showOldPrice />
      ))}
    </div>
  ) : (
    <NoResults type={type} />
  );
};
