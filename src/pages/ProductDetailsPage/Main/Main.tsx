import React from 'react';
import { ProductDetails } from '../ProductDetails/ProductDetails';
import { ProductsSlider } from '../../Home/components/ProductsSlider/ProductsSlider';
import './Main.scss';

export const Main = () => {
  return (
    <main className="Main">
      <div className="Main-Container">
        <ProductDetails />
        <ProductsSlider sliderType="You may also like" />
      </div>
    </main>
  );
};
