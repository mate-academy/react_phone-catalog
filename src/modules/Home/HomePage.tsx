import React from 'react';
import styles from './HomePage.module.scss';
import { BannerSlider } from './components/BannerSlider';
import { ProductSlider } from '../shared/components/ProductSlider';
import { CategoryGrid } from './components/CategoryGrid';
import { useHomePage } from './useHomePage';
import { SectionTitle } from '../shared/components/SectionTitle';
import { useTitle } from '../../hooks/useTitle';

export const HomePage: React.FC = () => {
  useTitle('Home');
  const { banners, newModels, hotPrices } = useHomePage();

  return (
    <div className={styles.homePage}>
      <h1 className="visually-hidden">Product Catalog</h1>

      <section className={styles.section}>
        <h2 className={styles.mainTitle}>Welcome to Nice Gadgets store!</h2>
        <BannerSlider banners={banners} />
      </section>

      <ProductSlider title="Brand new models" products={newModels} />

      <section className={styles.section}>
        <SectionTitle>Shop by category</SectionTitle>
        <CategoryGrid />
      </section>

      <ProductSlider title="Hot prices" products={hotPrices} hasDiscount />
    </div>
  );
};
