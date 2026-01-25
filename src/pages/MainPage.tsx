import { useEffect, useMemo, useState } from 'react';
import { Banner } from '../components/Banner';
import { ShopCatagory } from '../components/ShopCatagory';
import { PromotionSlider } from '../components/PromotionSlider';
import { useProducts } from '../context/ProductsContext';

import image1 from './../images/shopcategory/image1.jpg';
import image2 from './../images/shopcategory/image2.jpg';
import image3 from './../images/shopcategory/image3.jpg';
import { ShopCatagoryType } from '../types/ShopCategory';

export const MainPage = () => {
  const { accessories, tablets, phones, productsAll } = useProducts();
  const [shopCategoryInfo, setShopCategoryInfo] = useState<ShopCatagoryType[]>(
    [],
  );

  useEffect(() => {
    setShopCategoryInfo([
      {
        id: 'phones',
        name: 'Mobile phones',
        numbers: phones.length,
        image: image1,
      },

      {
        id: 'tablets',
        name: 'Tablets',
        numbers: tablets.length,
        image: image2,
      },

      {
        id: 'accessories',
        name: 'Accessories',
        numbers: accessories.length,
        image: image3,
      },
    ]),
      [];
  });

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
