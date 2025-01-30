import React from 'react';
import { ShopByCategory } from '../components/ShopByCategory';
import { HomeCarousel } from '../components/HomeCarousel';
import { BrandNewModelsHome } from '../components/BrandNewModelsHome';

export const HomePage = () => {
  return (
    <>
      <div className="container">
        <HomeCarousel />

        <BrandNewModelsHome type="Brand new models" />
        <ShopByCategory />
        <BrandNewModelsHome type="Hot Prices" />
      </div>
    </>
  );
};
