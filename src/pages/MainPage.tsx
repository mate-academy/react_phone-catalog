import React, { useEffect, useMemo } from 'react';
import { Banner } from '../components/Banner';
import { ShopCatagory } from '../components/ShopCatagory';
import { useLocation } from 'react-router-dom';
import { PromotionSlider } from '../components/PromotionSlider';
import { useProducts } from '../context/ProductsContext';
import { getProducts } from '../api/httpsRequest';

export const MainPage = () => {
  const location = useLocation();
  const { productsAll, addToDB } = useProducts();

  useEffect(() => {
    getProducts('phones').then(phones => {
      addToDB('phones', phones);
    });
    getProducts('tablets').then(tablets => {
      addToDB('tablets', tablets);
    });
    getProducts('accessories').then(accessories => {
      addToDB('accessories', accessories);
    });
    getProducts('allProducts').then(productsAll => {
      addToDB('allProducts', productsAll);
    });
  }, []);

  const getNewModels = useMemo(() => {
    return productsAll.filter(item => item.year > 2021 && item.id > 118);
  }, [productsAll]);

  const getHotModels = useMemo(() => {
    return productsAll.filter(item => item.year < 2018 && item.id < 20);
  }, [productsAll]);

  return (
    <>
      <Banner />
      <PromotionSlider products={getNewModels} title="Brand new models" />
      <ShopCatagory />
      <PromotionSlider products={getHotModels} title="Hot prices" />
    </>
  );
};
