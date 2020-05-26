import React from 'react';
import MainSlider from '../MainSlider/MainSlider';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';
import ProductsSlider from '../ProductsSlider/ProductsSlider';

export const Home = () => (
  <>
    <MainSlider />
    <ProductsSlider />
    <ShopByCategory />
  </>
);
