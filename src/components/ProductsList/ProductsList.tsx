import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  phones: Product[],
};

export const ProductsList: React.FC<Props> = ({ phones }) => (
  <div
    className="productslist phonespage__productslist"
    data-cy="productList"
  >
    {phones.map(phone => (
      <ProductCard key={phone.id} product={phone} />
    ))}
  </div>

);
