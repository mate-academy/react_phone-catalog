import React from 'react';

import { ProductsSlider } from '../ProductsSlider';
import { CatalogProducts } from '../../types/Types';

interface HotPricesProps {
  title: string;
  products: CatalogProducts[];
}

export const HotPrices: React.FC<HotPricesProps> = ({ title, products }) => {
  return <ProductsSlider title={title} products={products} />;
};
