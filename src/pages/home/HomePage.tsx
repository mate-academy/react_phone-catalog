import React, { useEffect, useState } from 'react';

import styles from './HomePage.module.scss';

import Loader from '../../components/loader/Loader';
import Carousel from '../../components/carousel/Carousel';
import Category from '../../components/category/Category';
import ProductSlider from '../../components/slider/ProductSlider';
import { Product, Products } from '../../types/Product';

import {
  getBrandNewProducts,
  getHotPriceProducts,
} from '../../helpers/Requests';

const HomePage: React.FC = () => {
  const [hotPricesProducts, setHotPricesProducts] = useState<Product[]>([]);
  const [brandNewModels, setBrandNewModels] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProductsFromServer = async (value: Products) => {
    try {
      let fetchedProducts;

      switch (value) {
        case 'hotPrices':
          fetchedProducts = await getHotPriceProducts();
          setHotPricesProducts(fetchedProducts);
          break;

        case 'brandNew':
          fetchedProducts = await getBrandNewProducts();
          setBrandNewModels(fetchedProducts);
          break;

        default: break;
      }
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  useEffect(() => {
    getProductsFromServer('hotPrices');
    getProductsFromServer('brandNew');
  }, []);

  return (
    <section className={styles.home}>
      <Carousel />

      {isLoading
        ? <Loader />
        : (
          <>
            <ProductSlider
              slider="prices"
              title="Hot prices"
              products={hotPricesProducts}
            />

            <Category
              tablets={0}
              accessories={0}
              phones={hotPricesProducts.length}
            />

            <ProductSlider
              slider="models"
              title="Brand new models"
              products={brandNewModels}
            />
          </>
        )}
    </section>
  );
};

export default HomePage;
