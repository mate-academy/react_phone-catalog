import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ProductsSlider } from '../ProductsSlider';

export const BrandNew: React.FC = () => {
  const { brandNewProducts } = useContext(AppContext);

  return (
    <div className="BrandNew">
      <div className="container">
        <ProductsSlider
          title="Brand new models"
          products={brandNewProducts}
        />
      </div>
    </div>
  );
};
