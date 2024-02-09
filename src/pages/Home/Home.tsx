import React from 'react';
import { Slider } from '../../components/Slider/Slider';

import './Home.scss';
import { banners } from '../../data/banners-data';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Categories } from '../../components/Categories/Categories';
import { usePhones } from '../../hooks/usePhones';

const BANNER_INTERVAL = 5000;

export const Home: React.FC = () => {
  const {
    phonesData,
    preparedBrandNewProducts,
    preparedHotPriceProducts,
  } = usePhones();

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
