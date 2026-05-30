import React from 'react';
import { Products } from '../../../../types/Products';
import { ProductsSlider } from '../../../../shared/layout/ProductsSlider';

type Props = {
  products?: Products[];
};

export const ProductsHotPrices: React.FC<Props> = ({ products }) => {
  const hotestProducts = products
    ?.sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 30);

  return <ProductsSlider title={'Hot prices'} products={hotestProducts} />;
};
