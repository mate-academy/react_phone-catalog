import React from 'react';
import { ProductItem } from '../ProductItem/ProductItem';

import './ProductList.scss';
import { Product } from '../../types/Product';

type Props = {
  currentProducts: Product[] | undefined,
};

export const ProductList: React.FC<Props> = ({
  currentProducts,
}) => {
  return (
    <ul
      data-cy="productList"
      className="products"
    >
      {currentProducts
        && currentProducts.map((product) => (
          <li key={product.id}>
            <ProductItem product={product} />
          </li>
        ))}
    </ul>
  );
};
