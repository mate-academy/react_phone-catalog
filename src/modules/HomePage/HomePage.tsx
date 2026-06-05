/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import { PicturesSlider } from '../../components/PicturesSlider/PicturesSlider';
// Проверь путь!
import styles from './HomePage.module.scss';

import productsData from '../../data/products.json';

// eslint-disable-next-line max-len
import { CategorySection } from '../../components/ShopByCategory/ShopByCategory';
import { ProductCard } from '../../components/ProduuctCard/ProductCard';

export interface Product {
  id: number;

  category: string;

  itemId: string;

  name: string;

  fullPrice: number;

  price: number;

  screen: string;

  capacity: string;

  color: string;

  ram: string;

  year: number;

  image: string;
}

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line max-len
  const [categoryCounts, setCategoryCounts] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  const [isAtStart, setIsAtStart] = useState(true);

  const [isAtEnd, setIsAtEnd] = useState(false);

  const [hotPrices, setHotPrices] = useState<Product[]>([]);

  const hotPricesRef = useRef<HTMLDivElement>(null);

  const [isAtStartHot, setIsAtStartHot] = useState(true);

  const [isAtEndHot, setIsAtEndHot] = useState(false);

  useEffect(() => {
    const counts = {
      phones: productsData.filter((p: any) => p.category === 'phones').length,
      tablets: productsData.filter((p: any) => p.category === 'tablets').length,
      accessories: productsData.filter((p: any) => p.category === 'accessories')
        .length,
    };

    setCategoryCounts(counts);

    const latestModels = [...productsData]
      .filter((p: any) => p.year >= 2022)
      .sort((a: any, b: any) => b.year - a.year)
      .map((product: any) => ({
        ...product,
        price: product.fullPrice,
      }));

    // 3. Фильтруем товары со скидкой
    const discountedProducts = [...productsData]
      .filter((product: any) => product.fullPrice > product.price)
      .sort(
        (a: any, b: any) => b.fullPrice - b.price - (a.fullPrice - a.price),
      );

    // 4. Сохраняем в стейты
    setProducts(latestModels);

    setHotPrices(discountedProducts);
  }, []);

  const updateButtonStates = () => {
    if (scrollContainerRef.current) {
      // eslint-disable-next-line max-len
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      setIsAtStart(scrollLeft <= 0);

      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;

      const card = container.querySelector('div');

      if (card) {
        const cardWidth = card.getBoundingClientRect().width;

        const step = cardWidth + 16;

        const scrollAmount = direction === 'left' ? -step : step;

        container.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  const updateHotStates = () => {
    if (hotPricesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = hotPricesRef.current;

      setIsAtStartHot(scrollLeft <= 0);

      setIsAtEndHot(scrollLeft + clientWidth >= scrollWidth - 10);
    }
  };

  const scrollHot = (direction: 'left' | 'right') => {
    if (hotPricesRef.current) {
      const containerWidth = hotPricesRef.current.clientWidth;

      const step =
        direction === 'left' ? -containerWidth - 16 : containerWidth + 16;

      hotPricesRef.current.scrollBy({ left: step, behavior: 'smooth' });

      setTimeout(updateHotStates, 500);
    }
  };

  return (
    <main className={styles.homePage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Product Catalog</h1>

        <section className={styles.sliderSection}>
          <PicturesSlider />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Brand new models</h2>

            <div className={styles.navigationButtons}>
              <button
                className={`${styles.navBtn} ${isAtStart ? styles.disabled : ''}`}
                onClick={() => scroll('left')}
                disabled={isAtStart}
              >
                {'<'}
              </button>
              <button
                className={`${styles.navBtn} ${isAtEnd ? styles.disabled : ''}`}
                onClick={() => scroll('right')}
                disabled={isAtEnd}
              >
                {'>'}
              </button>
            </div>
          </div>

          <div
            className={styles.productGrid}
            ref={scrollContainerRef}
            onScroll={updateButtonStates}
          >
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <CategorySection counts={categoryCounts} />

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Hot prices</h2>

            <div className={styles.navigationButtons}>
              <button
                className={`${styles.navBtn} ${isAtStartHot ? styles.disabled : ''}`}
                onClick={() => scrollHot('left')}
                disabled={isAtStartHot}
              >
                {'<'}
              </button>
              <button
                className={`${styles.navBtn} ${isAtEndHot ? styles.disabled : ''}`}
                onClick={() => scrollHot('right')}
                disabled={isAtEndHot}
              >
                {'>'}
              </button>
            </div>
          </div>

          <div
            className={styles.productGrid}
            ref={hotPricesRef}
            onScroll={updateHotStates}
          >
            {hotPrices.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
