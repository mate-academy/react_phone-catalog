import React from 'react';
import products from '../../../public/api/products.json';
import { Product, ProductSlider } from '../ProductSlider/ProductSlider';

const sortedByPrice = [...products]
  .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price))
  .splice(0, 11);

const formattedHotPrices: Product[] = sortedByPrice.map((item) => ({
  ...item,
  id: item.itemId,
}))

export const HotPrices: React.FC = () => {
  return (
    <ProductSlider
      title="Hot prices"
      products={formattedHotPrices}
      visibleCount={4}
    />
  )
}
