import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ProductsSlider } from '../ProductsSlider';

export const HotPrices: React.FC = () => {
  const { hotPriceProducts } = useContext(AppContext);

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
