/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import Carousel from '../Components/Carousel';
import { ProductsSlider } from '../Components/ProductsSlider';
import { ShopByCategory } from '../Components/ShopByCategory';
import { api, baseUrl } from '../api/api';
import { ProductType } from '../Types/ProductType';
import { BannerItem } from '../Components/BannerItem';

export const Home = () => {
  const [expensivePhones, setExpensivePhones] = useState<ProductType[]>([]);
  const [cheapPhones, setCheapPhones] = useState<ProductType[]>([]);

  useEffect(() => {
    api.getExpensivePhones().then(setExpensivePhones);
    api.getCheapPhones().then(setCheapPhones);
  }, []);

  return (
    <>
      <hr className="col-span-full h-10 border-0" />
      <Carousel>
        <BannerItem
          src={`${baseUrl}/_new/img/banner-phones.png`}
          to="catalogue/phones"
        />

        <BannerItem
          src={`${baseUrl}/_new/img/banner-tablets.png`}
          to="catalogue/tablets"
        />

        <BannerItem
          src={`${baseUrl}/_new/img/banner-accessories.png`}
          to="catalogue/accessories"
        />
      </Carousel>

      <hr className="col-span-full h-[72px] border-0" />

      <ProductsSlider products={cheapPhones} title="Hot Prices" />

      <hr className="col-span-full h-[72px] border-0" />

      <ShopByCategory />

      <hr className="col-span-full h-[72px] border-0" />

      <ProductsSlider products={expensivePhones} title="Brand new models" />

      <hr className="col-span-full h-[80px] border-0" />
    </>
  );
};
