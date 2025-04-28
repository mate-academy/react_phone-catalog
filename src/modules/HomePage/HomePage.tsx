import styles from './HomePage.module.scss';
import { useState, useEffect } from 'react';
import { Products } from '../../types/Products';
import {
  getHotPriceProducts,
  getNewProduct,
} from '../../utils/sortingProducts';
import { MainSlider } from './components/MainSlider';
import { ProductSlider } from './components/ProductSlider';
import { Categories } from './components/Categories';

export const HomePage = () => {
  const [newModels, setNewModels] = useState<Products[]>([]);
  const [hotPrices, setHotPrices] = useState<Products[]>([]);

  const slides = [
    'img/banner-accessories.png',
    'img/banner-phones.png',
    'img/banner-tablets.png',
  ];

  useEffect(() => {
    getHotPriceProducts().then(setHotPrices);
    getNewProduct().then(setNewModels);
  }, []);

  return (
    <section className={styles.home__page}>
      <div className={styles.home__page__wrapper}>
        <h1 className={styles.home__page__title}>
          Welcome to Nice <br className={styles['home__page__title-break']} />
          Gadgets store!
        </h1>

        <MainSlider slides={slides} />
      </div>

      <ProductSlider title="Brand new models" products={newModels} />
      <Categories />
      <ProductSlider title="Hot prices" products={hotPrices} />
    </section>
  );
};
