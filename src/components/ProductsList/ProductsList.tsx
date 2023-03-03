import React from 'react';
import './ProductsList.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  phones: Product[];
};

export const ProductsList: React.FC<Props> = ({ phones }) => {
  return (
    <div className="products-list" data-cy="productList">
      <div className="products-list__content">
        {phones.map(phone => (
          <ProductCard product={phone} key={phone.id} />
        ))}
      </div>
    </div>
  );
};
