import React from 'react';
import './homePage.scss';
import { Slider } from './MainSlider/mainSlider';
import { HotPrices } from './HotPrices/hotPrices';

export const HomePage = () => {
  return (
    <div className="HomePage">
      <Slider />
      <HotPrices />
    </div>
  );
};
