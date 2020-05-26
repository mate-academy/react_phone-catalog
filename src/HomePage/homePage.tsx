import React from 'react';
import './homePage.scss';
import { Slider } from './MainSlider/mainSlider';
import { HotPrices } from './HotPrices/hotPrices';
import { Category } from './CategoryShopping/Category';
import { BrandNew } from './BrandNew/BrandNew';

export const HomePage = () => {
  return (
    <div className="HomePage">
      <Slider />
      <HotPrices />
      <Category />
      <BrandNew />
    </div>
  );
};
