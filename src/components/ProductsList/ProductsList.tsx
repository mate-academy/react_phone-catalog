import React from 'react';
import { Product } from '../../types/Product';
import { ProductCart } from '../ProductCart';
import './ProductsList.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className="ProductsList" data-cy="productList">
      {products.map((phone) => (
        <ProductCart newProduct={phone} key={phone.itemId} />
      ))}
    </div>
  );
};
