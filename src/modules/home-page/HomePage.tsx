import React from 'react';
import styles from './HomePage.module.scss';
import { useAppSelector } from '../../hooks/hooks';
import { Product } from '../../types/Product';
import { PicturesSlider } from '../shared/components/pictures-slider';
import { ProductsSlider } from '../shared/components/products-slider';
import { Category } from '../shared/components/category';

export const HomePage: React.FC = () => {
  const products = useAppSelector(state => state.products);
  const years = products.map((product: Product) => product.year);
  const hotPriceProducts = products.filter(
    (product: Product) => product.fullPrice - product.price > 120,
  );
  const latestYear = Math.max(...years);
  const newProducts = products.filter(
    (product: Product) => product.year === latestYear,
  );

  return (
    <>
      <h1 hidden>Product Catalog</h1>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>
      <PicturesSlider />
      <h2 className={styles.subtitle}>Brand new models</h2>
      <ProductsSlider
        products={newProducts}
        navigationOffset={-50}
        sortBy="year"
      />
      <h2>Shop by category</h2>
      <Category products={products} />
      <h2>Hot prices</h2>
      <ProductsSlider
        products={hotPriceProducts}
        showFullPrice
        sortBy="fullPrice"
      />
    </>
  );
};
