import React from 'react';
import { Carousel } from '../components/Carousel/Carousel';
import { ProductsSlider } from '../components/ProductsSlider/ProductsSlider';

export const HomePage: React.FC = () => {
  return (
    <div className="container">
      <Carousel />

      <ProductsSlider title="Hot prices" />
    </div>
  );
};
