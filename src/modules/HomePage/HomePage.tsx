import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import productsData from '../../../public/api/products.json';
import { Product } from '../../types';
import styles from './HomePage.module.scss';

const products = productsData as Product[];

const CATEGORIES = [
  {
    id: 'phones',
    label: 'Mobile phones',
    path: '/phones',
    bg: 'linear-gradient(180deg, #1e1a3a 0%, #3a2980 100%)',
    emoji: '📱',
  },
  {
    id: 'tablets',
    label: 'Tablets',
    path: '/tablets',
    bg: 'linear-gradient(180deg, #0d2137 0%, #1a3a5c 100%)',
    emoji: '💻',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    path: '/accessories',
    bg: 'linear-gradient(180deg, #1a0a2e 0%, #4a1070 100%)',
    emoji: '🎧',
  },
];

export const HomePage: React.FC = () => {
  const brandNew = useMemo(
    () =>
      [...products]
        .sort((a, b) => b.year - a.year || b.fullPrice - a.fullPrice)
        .slice(0, 20),
    [],
  );

  const hotPrices = useMemo(
    () =>
      [...products]
        .filter(p => p.fullPrice > p.price)
        .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
        .slice(0, 20),
    [],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = {};

    products.forEach(p => {
      map[p.category] = (map[p.category] || 0) + 1;
    });

    return map;
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>

      <PicturesSlider />

      <ProductsSlider
        title="Brand new models"
        products={brandNew}
        showDiscount={false}
      />

      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Shop by category</h2>

        <div className={styles.categoryGrid}>
          {CATEGORIES.map(cat => (
            <Link key={cat.id} to={cat.path} className={styles.categoryCard}>
              <div
                className={styles.categoryImg}
                style={{ background: cat.bg }}
              >
                <span className={styles.categoryEmoji} aria-hidden="true">
                  {cat.emoji}
                </span>
              </div>

              <div className={styles.categoryInfo}>
                <h3 className={styles.categoryName}>{cat.label}</h3>
                <p className={styles.categoryCount}>
                  {counts[cat.id] ?? 0} models
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ProductsSlider title="Hot prices" products={hotPrices} />
    </main>
  );
};
