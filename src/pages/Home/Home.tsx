import React, { useEffect, useState } from 'react';

import { Slider } from '../../components/Slider/Slider';
import './Home.scss';
import { banners } from '../../data/banners-data';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Categories } from '../../components/Categories/Categories';
import { usePhones } from '../../hooks/usePhones';
import { Product } from '../../types/Product';
import { client } from '../../client/httpClient';
import { Loader } from '../../components/Loader/Loader';

const BANNER_INTERVAL = 5000;

export const Home: React.FC = () => {
  const {
    products,
    setProducts,
    preparedBrandNewProducts,
    preparedHotPriceProducts,
  } = usePhones();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    client.get<Product[]>('products.json')
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, [setProducts]);

  return (
    <div className="home">
      {isLoading && <Loader />}

      {!isLoading && (
        <>
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
              products={products || []}
            />
          </section>

          <section className="section brand-new home__brand-new">
            <ProductsList
              products={preparedBrandNewProducts}
              title="Brand new models"
            />
          </section>
        </>
      )}
    </div>
  );
};
