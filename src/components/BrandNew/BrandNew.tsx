import React from 'react';
import { useProducts } from '../../context/AppContext';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

export const BrandNew: React.FC = () => {
  const { brandNewProducts } = useProducts();

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
