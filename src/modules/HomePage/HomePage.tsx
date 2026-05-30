import React from 'react';
import { useEffect, useState } from 'react';
import { Product } from '../../types';
import { getProducts } from '../../utils/api';
import { BannerSlider } from './components/BannerSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { Loader } from '../shared/components/Loader';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const hotPrices = [...products]
    .filter(p => p.fullPrice > p.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 20);

  const brandNew = [...products]
    .sort((a, b) => b.year - a.year || b.price - a.price)
    .slice(0, 20);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

        <BannerSlider />

        {loading ? (
          <Loader />
        ) : (
          <>
            <ProductsSlider title="Brand new models" products={brandNew} />
            <ShopByCategory products={products} />
            <ProductsSlider title="Hot prices" products={hotPrices} />
          </>
        )}
      </div>
    </main>
  );
};
