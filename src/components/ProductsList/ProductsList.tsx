import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';

type Props = {
  phones: Product[];
};

export const ProductsList: React.FC<Props> = ({ phones }) => {
  return (
    <div className="products-list">
      <div className="products-list__content">
        {phones.map(phone => (
          <ProductCard product={phone} />
        ))}
      </div>
    </div>
  );
};
