import { useMemo } from 'react';
import useSwr from 'swr';
import { Banner } from '../../components/Banner';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import './homepage.scss';
import { Products } from '../../components/Products';
import { Product } from '../../types/product';
import { BASE_URL, fetcher } from '../../api/productsApi';

const imagesForBanner = [
  '/_new/img/banner-phones.png',
  '/_new/img/banner-tablets.png',
  '/_new/img/banner-accessories.png',
];

export const HomePage = () => {
  const { data: phones }: { data: Product[] }
    = useSwr(BASE_URL, fetcher, { suspense: true }); // loading data from api

  const hotPricesPhones = useMemo(() => {
    return phones
      .filter((phone) => {
        const discount = phone.fullPrice - phone.price;

        return discount >= 60;
      })
      .sort((firstPhone, secondPhone) => {
        return secondPhone.fullPrice - firstPhone.fullPrice;
      });
  }, [phones]); // filtering hot prices phones

  const brandNewPhones = useMemo(() => {
    return phones
      .filter((phone) => {
        return phone.year > 2018;
      });
  }, [phones]); // filtering the brand new models

  return (
    <div className="homepage-container">
      <Banner images={imagesForBanner} />
      {/* // main slider */}

      <ProductsSlider
        title="Hot Prices"
        itemsLength={hotPricesPhones.length}
      >
        <Products products={hotPricesPhones} />
      </ProductsSlider>

      <ShopByCategory />

      <ProductsSlider
        title="Brand new models"
        itemsLength={brandNewPhones.length}
      >
        <Products products={brandNewPhones} />
      </ProductsSlider>
    </div>
  );
};
