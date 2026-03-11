import React from 'react';
import styles from './HomePage.module.scss';
import { BannerSlider } from './components/BannerSlider';
import { ProductSlider } from '../shared/components/ProductSlider';
import { CategoryGrid } from './components/CategoryGrid';
import { useOutletContext } from 'react-router-dom';
import { ContextProps } from '../../types/ContextProps';

export const HomePage: React.FC = () => {
  const { categories, products } = useOutletContext<ContextProps>();

  const banners = categories.map(c => ({
    img: c.banner,
    link: c.path,
    alt: c.bannerAlt,
  }));

  const newModels = products.filter(p => p.year >= 2022);

  const hotPrices = [...products]
    .filter(p => p.fullPrice - p.price > 0)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return (
    <main className={styles.homePage}>
      <div className={styles.heroContainer}>
        <section className={styles.section}>
          <h1 className={styles.mainTitle}>Welcome to Nice Gadgets store!</h1>
          <BannerSlider banners={banners} />
        </section>
      </div>

      <div className={styles.contentContainer}>
        {false ? (
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
