import { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { Categories } from './components/Categories';
import { MainSlider } from './components/MainSlider';
import { getHotPriceProducts, getNewProducts } from '../../servises/products';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../../components/ProductsSlider';

export const HomePage = () => {
  const [newModels, setNewModels] = useState<Product[]>([]);
  const [hotPrices, setHotPrices] = useState<Product[]>([]);

  useEffect(() => {
    getHotPriceProducts().then(setHotPrices);
    getNewProducts().then(setNewModels);
  }, []);

  return (
    <div className={styles['home-page']}>
      <div className={styles['home-page__wrapper']}>
        <h1 className={styles['home-page__title']}>
          Welcome to Nice <br className={styles['home-page__title-break']} />
          Gadgets store!
        </h1>

        <MainSlider className={styles['home-page__main-slider']} />
      </div>
      <ProductsSlider title="Brand new models" products={newModels} />

      <Categories />

      <ProductsSlider title="Hot prices" products={hotPrices} />
    </div>
  );
};
