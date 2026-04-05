import React from 'react';
import { ProductSlider } from '../ProductSlider';
import { CatalogProducts } from '../../types/Types';

interface HotPricesProps {
  title: string;
  products: CatalogProducts[];
}

export const HotPrices: React.FC<HotPricesProps> = ({ title, products }) => {
  return <ProductSlider title={title} products={products} />;
};
