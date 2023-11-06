import React from 'react';
import { useProducts } from '../../context/AppContext';
import { ProductsSlider } from '../ProductsSlider';

export const HotPrices: React.FC = () => {
  const { hotPriceProducts } = useProducts();

  return (
    <div className="HotPrices">
      <div className="container">
        <ProductsSlider
          title="Hot prices"
          products={hotPriceProducts}
        />
      </div>
    </div>
  );
};
