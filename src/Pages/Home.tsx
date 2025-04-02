import React from 'react';
import { Slideshow } from '../Slideshow/Slideshow';
import './Styles/home.scss';
import { BrandNewModels } from '../BrendNewModel/BrandNewModels';
import { ShopbyCategory } from '../Shopbycategory/ShopbyCategory';
import { HotPrices } from '../HotPrices/HotPrices';

const images = [
  'src/Slideshow/banner-accessories.png',
  'src/Slideshow/banner-phones.png',
  'src/Slideshow/banner-tablets.png',
];

export const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Welcome to Nice Gadgets store!</h1>
      <Slideshow images={images} />
      <BrandNewModels />
      <ShopbyCategory />
      <HotPrices />
    </div>
  );
};
