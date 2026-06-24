import React from 'react';
import { Slider } from './components/Slider';
import { NewModels } from './components/NewModels';
import { Category } from './components/Category';
import { HotPrices } from './components/HotPrice/HotPrice';

export const HomePage = () => {
  return (
    <div>
      <Slider />
      <NewModels />
      <Category />
      <HotPrices />
    </div>
  );
};
