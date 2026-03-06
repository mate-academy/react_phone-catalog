import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { BannerSlider } from './components/BannerSlider';
import { ProductSlider } from '../shared/components/ProductSlider';
import { CategoryGrid } from './components/CategoryGrid';
import { getProducts } from '../shared/services/productService';
import { Product } from '../../types/Product';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .finally(() => setIsLoading(false));
  }, []);

  const newModels = products.filter(p => p.year >= 2022);

  const hotPrices = [...products]
    .filter(p => p.fullPrice - p.price > 0)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return (
    <main className={styles.homePage}>
      <div className={styles.heroContainer}>
        <section className={styles.section}>
          <h1 className={styles.mainTitle}>Welcome to Nice Gadgets store!</h1>
          <BannerSlider />
        </section>
      </div>

      <div className={styles.contentContainer}>
        {isLoading ? (
          <h2>Loading products...</h2>
        ) : (
          <>
            <ProductSlider title="Brand new models" products={newModels} />

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Shop by category</h2>
              <CategoryGrid />
            </section>

            <section className={styles.section}>
              <ProductSlider
                title="Hot prices"
                products={hotPrices}
                hasDiscount
              />
            </section>
          </>
        )}
      </div>
    </main>
  );
};
