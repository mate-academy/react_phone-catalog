import React from 'react';
import './ProductCatalog.scss';
import { ProductType } from '../../types/ProductType';
import { Product } from '../Product/Product';

export interface Props {
  models: ProductType[];
}

export const ProductCatalog: React.FC<Props> = ({ models }) => {
  return (
    <section className="product-catalog">
      {models.map(product => (
        <Product model={product} key={product.id} />
      ))}
    </section>
  );
};
