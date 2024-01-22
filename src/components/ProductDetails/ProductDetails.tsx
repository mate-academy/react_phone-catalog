import React from 'react';
import './ProductDetails.scss';
import { Product } from '../../types/Product';

interface Props {
  product: Product | null,
}

export const ProductDetails: React.FC<Props> = ({ product }) => {
  return (
    <section>
      <h1>{product?.name}</h1>
    </section>
  );
};
