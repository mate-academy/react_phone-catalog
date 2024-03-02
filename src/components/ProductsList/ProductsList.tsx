import React from 'react';
import './ProductsList.scss';
import { Product } from '../../type/Product';
import { ProductCart } from '../ProductCard';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className="products__list" data-cy="productList">
      {
        products.map(product => (
          <ProductCart key={product.id} product={product} />))
      }
    </div>
  );
};
