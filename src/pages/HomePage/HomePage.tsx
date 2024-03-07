/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Typography } from '../../ui/base';
import { ShopByCategory } from '../../ui/components';
import { Banner, ProductCardSlider } from '../../ui/modules';

import { getBrandNewProducts, getHotPriceProducts } from '../../utils';
import { Product } from '../../types';

import './HomePage.scss';

type Props = {};

export const HomePage: React.FC<Props> = () => {
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

  const [hotPriceProductsLoader, setHotPriceProductsLoader] =
    useState<boolean>(false);
  const [brandNewProductsLoader, setbrandNewProductsLoader] =
    useState<boolean>(false);

  useEffect(() => {
    setHotPriceProductsLoader(true);
    setbrandNewProductsLoader(true);

    getHotPriceProducts()
      .then(setHotPriceProducts)
      .finally(() => setHotPriceProductsLoader(false));

    getBrandNewProducts()
      .then(setBrandNewProducts)
      .finally(() => setbrandNewProductsLoader(false));
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
        <ProductCardSlider title="Hot prices" products={hotPriceProducts} />
      </section>
      <section className="home__section">
        <ShopByCategory />
      </section>
      <section className="home__section">
        <ProductCardSlider
          title="Brand new models"
          products={brandNewProducts}
        />
      </section>
    </div>
  );
};
