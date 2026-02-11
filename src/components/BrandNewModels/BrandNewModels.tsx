import React from 'react';
import products from '../../../public/api/products.json';

import { Product, ProductSlider } from '../ProductSlider/ProductSlider';

const sortedByYear = [...products]
  .filter(product => product.capacity === '256GB')
  .sort((a, b) => b.year - a.year)
  .slice(0, 12)
  .map(({ fullPrice, ...rest}) => rest);

const formattedNewModels: Product[] = sortedByYear.map((item) => ({
  ...item,
  id: item.itemId,
}));

export const BrandNewModels: React.FC = () => {
  return (
    <ProductSlider
      title="Brand new models"
      products={formattedNewModels}
    />
  )
}
