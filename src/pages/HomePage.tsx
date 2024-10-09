import React from 'react';
import { ShopByCategory } from '../components/ShopByCategory';
import { HomeCarousel } from '../components/HomeCarousel';
import { BrandNewModelsHome } from '../components/BrandNewModelsHome';

export const HomePage = () => {
  return (
    <>
      <HomeCarousel />

      <BrandNewModelsHome type="Brand new models" />

      <ShopByCategory />

      <BrandNewModelsHome type="Hot Prices" />
    </>
  );
};
