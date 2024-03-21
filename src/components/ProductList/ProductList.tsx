import React, { memo } from 'react';

import { ProductCard } from '../ProductCard';

import { Product } from '../../types/Product';

import './ProductList.scss';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = memo(({ products }) => {
  return (
    <ul className="ProductList" data-cy="productList">
      {products.map(product => (
        <li className="ProductList__item" key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
});
