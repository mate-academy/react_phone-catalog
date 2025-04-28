import React from 'react';
import SliderHotPrices from '../components/SliderHotPrices/SliderHotPrices';
import SliderNewBrands from '../components/SliderNewBrands/SliderNewBrands';
export const HomePage: React.FC = () => (
  <div className="section">
    <div className="container">
      <h1 className="title">Home Page</h1>
      <SliderNewBrands />
      <SliderHotPrices />
    </div>
  </div>
);
