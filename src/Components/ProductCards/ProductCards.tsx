import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

import './ProductCards.scss';

type Props = {
  slicedProducts: Product[];
};

export const ProductCards: React.FC<Props> = ({ slicedProducts }) => {
  return (
    <div className="product-cards">
      <ProductCard slicedProducts={slicedProducts} />
    </div>
  );
};
