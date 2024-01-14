/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import { Carousel } from '../../components/Carousel';
import { ProductSlider } from '../../components/ProductSlider';
import { getPhones } from '../../api/api';
import { Product } from '../../types/Product';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const produectsFromServer = await getPhones();

      setProducts(produectsFromServer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="home-page-container">
      <Carousel />

      <section className="hot-prices">
        <ProductSlider title="Hot prices" products={products} />
      </section>

      <section className="shop-by-category">
        Shop by category
      </section>

      {/* <section className="brand-new-models">

      </section> */}

    </div>
  );
};
