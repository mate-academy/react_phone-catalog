import React from 'react';
import { PicturesSlider } from '../../components/Slider/PicturesSlider';
import { NewModels } from '../../components/NewModels/NewModels';
import { Category } from '../../components/Category/Category';
import { HotPrices } from '../../components/HotPrices/HotPrices';

export const HomePage = () => {
  return (
    <>
      <PicturesSlider />
      <NewModels />
      <Category />
      <HotPrices />
    </>
  );
};
