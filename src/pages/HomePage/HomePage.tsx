import React from 'react';
import { Banner } from '../../components/Banner/Banner';
import { HotPrices } from '../../components/HotPrices';
import { NewModels } from '../../components/NewModels';
import { ShopCategory } from '../../components/ShopCategory';

export const HomePage = () => {
  return (
    <>
      <Banner />
      <NewModels />
      <ShopCategory />
      <HotPrices />
    </>
  );
};
