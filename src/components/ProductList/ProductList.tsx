import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

import './ProductList.scss';
import { FavouriteType } from '../../types/FavouriteType';

type Props = {
  products: Product[] | FavouriteType[],
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="phones__catalog product-list" data-cy="productList">
      {products.map(product => (
        <ProductCard product={product} isDiscount key={product.phoneId} />
      ))}
    </div>
  );
};
