import React from 'react';
import { Slideshow } from '../Slideshow/Slideshow';
import './Styles/home.scss';
import { BrandNewModels } from '../BrendNewModel/BrandNewModels';
import { ShopbyCategory } from '../Shopbycategory/ShopbyCategory';
import { HotPrices } from '../HotPrices/HotPrices';

export const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Welcome to Nice Gadgets store!</h1>
      <Slideshow />
      <BrandNewModels />
      <ShopbyCategory />
      <HotPrices />
    </div>
  );
};
