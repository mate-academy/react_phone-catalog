import React from 'react';
import { Intro } from '../components/Intro';
import { NewModels } from '../components/NewModels';
import { Categories } from '../components/Categoties';
import { HotPrices } from '../components/HotPrices';

export const HomePage: React.FC = () => {
  return (
    <>
      <Intro />
      <NewModels />
      <Categories />
      <HotPrices />
    </>
  );
};
