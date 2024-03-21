/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Typography, Loader } from '../../ui/base';
import { ShopByCategory } from '../../ui/components';
import { Banner, ProductCardSlider } from '../../ui/modules';

import { getBrandNewProducts, getHotPriceProducts, wait } from '../../utils';
import { Product } from '../../types';

import './HomePage.scss';

type Props = {};

export const HomePage: React.FC<Props> = () => {
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

  const [hotPriceLoad, setHotPriceLoad] = useState<boolean>(false);
  const [brandNewLoad, setBrandNewLoad] = useState<boolean>(false);

  useEffect(() => {
    setHotPriceLoad(true);
    setBrandNewLoad(true);

    wait(500).then(() => {
      getHotPriceProducts()
        .then(setHotPriceProducts)
        .finally(() => setHotPriceLoad(false));

      getBrandNewProducts()
        .then(setBrandNewProducts)
        .finally(() => setBrandNewLoad(false));
    });
  }, []);

  return (
    <div className="home">
      <Typography type="title" level="1" className="home__title">
        Home Page
      </Typography>
      <section className="home__section">
        <Banner />
      </section>
      <section className="home__section">
        <ProductCardSlider
          title="Hot prices"
          products={hotPriceProducts}
          isLoadProducts={hotPriceLoad}
        />
      </section>
      <section className="home__section">
        <ShopByCategory />
      </section>
      <section className="home__section">
        <ProductCardSlider
          title="Brand new models"
          products={brandNewProducts}
          isLoadProducts={brandNewLoad}
        />
      </section>
    </div>
  );
};
