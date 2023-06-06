import { useEffect, useState } from 'react';

import { Banner } from '../../components/Banner/Banner';
import { CardsContainer } from '../../components/CardsContainer/CardsContainer';
import { Product } from '../../types/product';
import { ShopCategories } from '../../components/ShopCategories/ShopCategories';
import './HomePage.scss';
import {
  getBrandNewProducts,
  getHotPriceProducts,
} from '../../helpers/productsFunctions';

export const HomePage = () => {
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    getHotPriceProducts().then(setHotProducts);
    getBrandNewProducts().then(setNewProducts);
  }, []);

  return (
    <div className="home-page">
      <div className="home-page__banner">
        <Banner />
      </div>

      <section className="home-page__hot">
        <CardsContainer title="Hot prices" products={hotProducts} />
      </section>

      <section className="home-page__categories">
        <ShopCategories />
      </section>

      <section className="home-page__new">
        <CardsContainer title="Brand new models" products={newProducts} />
      </section>
    </div>
  );
};
