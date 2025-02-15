import React from 'react';
import { NewModels } from './components/NewModels/NewModels';
import { Categories } from './components/Categories';
import { HotPrices } from './components/hotPrices';
import { Banner } from './components/Banner';

export const HomePage: React.FC = () => {
  return (
    <>
      <Banner />
      <NewModels />
      <Categories />
      <HotPrices />
    </>
  );
};
