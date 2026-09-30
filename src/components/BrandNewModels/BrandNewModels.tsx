import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import styles from './BrandNewModels.module.scss';

interface BrandNewModelsProps {
  products?: Product[];
}

export const BrandNewModels = ({ products = [] }: BrandNewModelsProps) => {
  const safeProducts = Array.isArray(products) ? products : [];
  const containerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const displayedProducts = safeProducts
    .sort((a, b) => b.year - a.year)
    .slice(0, 20);

  const checkScrollPosition = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    // якщо scrollLeft > 1, значить юзер вже поскролив вправо, значить ліва стрілка потрібна
    setCanScrollLeft(scrollLeft > 1);

    // якщо поточний скрол + видима ширина менші за загальну ширину (з запасом),
    // значить ще є контент спереду, отже права стрілка ще активна
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    checkScrollPosition();
    container.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [displayedProducts]);

  if (displayedProducts.length === 0) {
    return null;
  }

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollAmount = clientWidth * 0.75;

      containerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
  // загальна секція що вміщає тайтл, навігацію, картки
  <section className={styles.section}>
    <div className={styles.header}>
      <h2 className={styles.sectionTitle}>Brand new {' '} models</h2>

      {/* кнопки-стрілки вліво та вправо */}
      <div className={styles.buttons}>
        <button
          className={`${styles.arrowButton} ${!canScrollLeft ? styles.disabled : ''}`}
          onClick={() => scroll('left')}
          // блок елемента для запобігання зайвим клікам
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          ‹
        </button>
        <button
          className={`${styles.arrowButton} ${!canScrollRight ? styles.disabled : ''}`}
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </div>

    <div
      className={styles.cardsContainer}
      ref={containerRef}
    >
      {displayedProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  </section>
  );
};
