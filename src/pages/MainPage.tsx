import React, { useEffect, useMemo, useState } from 'react';
import { Banner } from '../components/Banner';
import { ShopCatagory } from '../components/ShopCatagory';
import { useLocation } from 'react-router-dom';
import { PromotionSlider } from '../components/PromotionSlider';
import { useProducts } from '../context/ProductsContext';
import { getProducts } from '../api/httpsRequest';

import image1 from './../images/shopcategory/image1.jpg';
import image2 from './../images/shopcategory/image2.jpg';
import image3 from './../images/shopcategory/image3.jpg';
import { ShopCatagoryType } from '../types/ShopCategory';

export const MainPage = () => {
  const { productsAll, addToDB } = useProducts();
  const [shopCategoryInfo, setShopCategoryInfo] = useState<ShopCatagoryType[]>(
    [],
  );

  useEffect(() => {
    getProducts('phones').then(phones => {
      addToDB('phones', phones);
      setShopCategoryInfo(prev => {
        return [
          ...prev,
          {
            id: 'phones',
            name: 'Mobile phones',
            numbers: phones.length,
            image: image1,
          },
        ];
      });
    });
    getProducts('tablets').then(tablets => {
      addToDB('tablets', tablets);
      setShopCategoryInfo(prev => {
        return [
          ...prev,
          {
            id: 'tablets',
            name: 'Tablets',
            numbers: tablets.length,
            image: image2,
          },
        ];
      });
    });
    getProducts('accessories').then(accessories => {
      addToDB('accessories', accessories);
      setShopCategoryInfo(prev => {
        return [
          ...prev,
          {
            id: 'accessories',
            name: 'Accessories',
            numbers: accessories.length,
            image: image3,
          },
        ];
      });
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
      <ShopCatagory shopCategoryInfo={shopCategoryInfo} />
      <PromotionSlider products={getHotModels} title="Hot prices" />
    </>
  );
};
