import './ProductList.scss';
import React from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import { NoSearchResults } from '../NoSearchResults';

type Props = {
  itemsList: Product[],
};

export const ProductList: React.FC<Props> = ({ itemsList }) => {
  return (
    itemsList.length !== 0
      ? (
        <div
          className="product-list"
          data-cy="productList"
        >
          {itemsList.map(item => (
            <ProductCard
              key={item.id}
              product={item}
            />
          ))}
        </div>
      )
      : (
        <NoSearchResults />
      )
  );
};
