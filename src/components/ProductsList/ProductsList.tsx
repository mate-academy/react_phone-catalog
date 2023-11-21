import React from 'react';
import { Product } from '../../type/Product';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';

type Props = {
  phones: Product[];
};

export const ProductsList: React.FC<Props> = ({ phones }) => {
  return (
    <>
      {phones.map(phone => (
        <ProductCard product={phone} key={phone.id} />
      ))}
    </>
  );
};
