import { useState, useEffect } from 'react';

import { Banner } from '../../components/HomePage/Banner/Banner';
import {
  getBrandNewProducts,
  getHotPriceProducts,
} from '../../helpers/requests';
import { Product } from '../../types/product';
import { ShopCategories } from '../../components/HomePage/ShopCategories/ShopCategories';
import { ProductCardSlider } from '../../components/ProductCardSlider/ProductCardSlider';
import './HomePage.scss';

export const HomePage = () => {
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    getHotPriceProducts().then(setHotProducts);
    getBrandNewProducts().then(setNewProducts);
  }, []);

  return (
    <div className="home-page">
      <Banner />
      <section className="home-page__section">
        <ProductCardSlider title="Hot prices" products={hotProducts} />
      </section>

      <section className="home-page__section">
        <ShopCategories />
      </section>

      <section className="home-page__section">
        <ProductCardSlider title="Brand new models" products={newProducts} />
      </section>
    </div>
  );
};
