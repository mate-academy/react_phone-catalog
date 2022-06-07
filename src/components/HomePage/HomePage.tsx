/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { Banner } from '../Banner';
import { ProductSlider } from '../ProductSlider';
import { ShopByCategory } from '../ShopByCategory';
import {
  getBrandNewProducts,
  getHotPriceProducts,
} from '../../api/api';
import './HomePage.scss';
import { Product } from '../../types/Product';

export const HomePage: React.FC = React.memo(
  () => {
    const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
    const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

    useEffect(() => {
      getHotPriceProducts().then(setHotPriceProducts);
      getBrandNewProducts().then(setBrandNewProducts);
    }, []);

    return (
      <div className="home-page">
        <Banner />

        <section className="hot-prices home-page__hot-prices">
          <ProductSlider
            title="Hot prices"
            products={hotPriceProducts}
          />
        </section>

        <ShopByCategory />

        <section className="brand-new home-page__brand-new">
          <ProductSlider
            title="Brand new models"
            products={brandNewProducts}
          />
        </section>

      </div>
    );
  },
);
