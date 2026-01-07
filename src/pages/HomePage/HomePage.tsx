import React, { useState, useEffect } from 'react';
import { PicturesSlider } from '../../components/PicturesSlider/PicturesSlider';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Categories } from '../../components/Categories/Categories';
import { Product } from '../../types/Product';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const brandNewProducts = [...products]
    .sort((a, b) => b.year - a.year)
    .slice(0, 4);

  const hotPriceProducts = [...products]
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;
      return discountB - discountA;
    })
    .slice(0, 4);

  return (
    <div className={styles.homePage}>
      {/* 1. Tytuł - bezpieczny, bo poza sliderWrapperem */}
      <h1 className={styles.title}>Witamy w sklepie Nice Gadgets!</h1>

      {/* 2. Slider - TYLKO on wyłamuje się z marginesów */}
      <div className={styles.sliderWrapper}>
        <PicturesSlider />
      </div>

      {/* 3. Sekcje - bezpieczne, trzymają margines z App.scss */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Zupełnie nowe modele</h2>
        </div>
        <ProductsList products={brandNewProducts} />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Kategorie</h2>
        </div>
        <Categories />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Gorące okazje</h2>
        </div>
        <ProductsList products={hotPriceProducts} />
      </section>
    </div>
  );
};
