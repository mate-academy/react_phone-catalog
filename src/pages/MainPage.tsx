import React, { useMemo } from 'react';
import { Banner } from '../components/Banner';
import { NewModels } from '../components/NewModels';
import { ShopCatagory } from '../components/ShopCatagory';
import products from '../../public/api/products.json';

export const MainPage = () => {
  const getNewModels = useMemo(() => {
    return products.filter(item => item.year > 2021 && item.id > 118);
  }, []);

  const getHotModels = useMemo(() => {
    return products.filter(item => item.year < 2018 && item.id < 20);
  }, []);

  return (
    <>
      <Banner />
      <NewModels />
      <ShopCatagory />
    </>
  );
};
