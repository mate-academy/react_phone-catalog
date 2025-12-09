import React, { useMemo } from 'react';
import { Banner } from '../components/Banner';
import { ShopCatagory } from '../components/ShopCatagory';
import { useLocation } from 'react-router-dom';
import { PromotionSlider } from '../components/PromotionSlider';
import { useProducts } from '../context/ProductsContext';

export const MainPage = () => {
  const location = useLocation();
  const { productsAll } = useProducts();

  const getNewModels = useMemo(() => {
    return productsAll.filter(item => item.year > 2021 && item.id > 118);
  }, []);

  const getHotModels = useMemo(() => {
    return productsAll.filter(item => item.year < 2018 && item.id < 20);
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
