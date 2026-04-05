import React from 'react';
import { ProductSlider } from '../ProductSlider';
import { CatalogProducts } from '../../types/Types';

interface HotPricesProps {
  title: string;
  products: CatalogProducts[];
}

export const HotPrices: React.FC<HotPricesProps> = ({ title, products }) => {
  const sortedProducts = [...products].sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );

  return <ProductSlider title={title} products={sortedProducts} />;
};
