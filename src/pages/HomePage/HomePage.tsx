import React from 'react';
import styles from './HomePage.module.scss';
import { Hero } from './components/Hero';
import { ProductsSlider } from './components/ProductsSlider';
import { getNewModels } from '../../utils/getNewModels';
import { sortById } from '../../utils/sortById';
import { useProducts } from '../../hooks/useProducts';
import { getUniqueProducts } from '../../utils/getUniqueProducts';
import { CategoryShop } from './components/CategoryShop';

export const HomePage = () => {
  const { products } = useProducts();
  const newModels = sortById(getNewModels(products));
  const uniqueProducts = getUniqueProducts(newModels);
  return (
    <main className={styles['home-page']}>
      <Hero />
      <ProductsSlider products={uniqueProducts} />
      <CategoryShop />
    </main>
  );
};
