import React, { useEffect, useState } from 'react';
import { Slider } from '../../components/Slider/Slider';

import './Home.scss';
import { Phone } from '../../types/Phone';
import { getData } from '../../client/httpClient';
import { banners } from '../../data/banners-data';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Categories } from '../../components/Categories/Categories';

const BANNER_INTERVAL = 5000;

export const Home: React.FC = () => {
  const [phonesData, setPhonesData] = useState<Phone[] | null>(null);

  useEffect(() => {
    getData('_new/products.json')
      .then(setPhonesData);
  }, []);

  const preparedHotPriceProducts = phonesData?.filter((product: Phone) => (
    product.fullPrice - product.price >= 90
  )) || [];

  const preparedBrandNewProducts = phonesData?.filter((product: Phone) => (
    product.year >= 2019
  )) || [];

  return (
    <div className="home">
      <section className="slider home__slider">
        <Slider
          slidesCount={banners.length}
          interval={BANNER_INTERVAL}
          banners={banners}
        />
      </section>

      <section className="section hot-prices home__hot-prices">
        <ProductsList
          products={preparedHotPriceProducts}
          title="Hot prices"
        />
      </section>

      <section className="section categories">
        <Categories
          phonesData={phonesData || []}
        />
      </section>

      <section className="section brand-new home__brand-new">
        <ProductsList
          products={preparedBrandNewProducts}
          title="Brand new models"
        />
      </section>
    </div>
  );
};
