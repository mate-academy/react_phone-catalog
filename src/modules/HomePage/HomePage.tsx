import React from 'react';
import styles from './HomePage.module.scss';

import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory/ShopByCategory';
import productsData from '../../api/products.json';
import { Product } from '../../types/Product';

export const HomePage: React.FC = () => {
  const products: Product[] = productsData as unknown as Product[];

  const newProducts = [...products].sort((a, b) => b.year - a.year);

  const hotPriceProducts = [...products]
    .filter(p => p.fullPrice && p.price && p.price < p.fullPrice)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return (
    <main className={styles.homePage}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>

      <section className={styles.homePage__section}>
        <PicturesSlider title="Welcome to Nice Gadgets store!" />
      </section>

      <section className={styles.homePage__section}>
        <ProductsSlider title="Brand new models" products={newProducts} />
      </section>

      <section className={styles.homePage__section}>
        <ShopByCategory products={products} />
      </section>

      <section className={styles.homePage__section}>
        <ProductsSlider
          title="Hot prices"
          products={hotPriceProducts}
          showFullPrice={true}
        />
      </section>
    </main>
  );
};
