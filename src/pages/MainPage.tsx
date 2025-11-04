import React, { useMemo } from 'react';
import { Banner } from '../components/Banner';
import { ShopCatagory } from '../components/ShopCatagory';
import products from '../../public/api/products.json';
import { useLocation } from 'react-router-dom';
import { PromotionSlider } from '../components/PromotionSlider';

export const MainPage = () => {
  const location = useLocation();

  const getNewModels = useMemo(() => {
    return products.filter(item => item.year > 2021 && item.id > 118);
  }, []);

  const getHotModels = useMemo(() => {
    return products.filter(item => item.year < 2018 && item.id < 20);
  }, []);

  return (
    <>
      <Banner />
      <PromotionSlider products={getNewModels} title="Brand new models" />
      <ShopCatagory />
      <PromotionSlider products={getHotModels} title="Hot prices" />
    </>
  );
};
