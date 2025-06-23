import React from 'react';
import { Banner } from '../components/Banner';
import { NewModels } from '../components/NewModels';
import { ShopCatagory } from '../components/ShopCatagory';

export const MainPage = () => {
  return (
    <>
      <Banner />
      <NewModels />
      <ShopCatagory />
    </>
  );
};
