// components/SliderSection.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Product } from '../../../shared/types';
import { ProductsList } from '../../../CategoryPage/components/ProductsList';
import styles from './SliderSection.module.scss';

interface SliderSectionProps {
  title: string;
  products: Product[];
  isHot?: boolean;
}

export const SliderSection: React.FC<SliderSectionProps> = ({
  title,
  products,
  isHot,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState<number>(4);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;

      setSlidesPerView(width >= 1200 ? 4 : width >= 700 ? 3 : 1);
    };

    update();
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  const pages = useMemo(() => {
    if (!products.length) {
      return [];
    }

    const chunkSize = Math.max(1, slidesPerView);
    const chunks: Product[][] = [];

    for (let i = 0; i < products.length; i += chunkSize) {
      chunks.push(products.slice(i, i + chunkSize));
    }

    return chunks;
  }, [products, slidesPerView]);

  const goToPrev = () => {
    if (!pages.length) {
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + pages.length) % pages.length);
      setIsTransitioning(false);
    }, 500);
  };

  const goToNext = () => {
    if (!pages.length) {
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % pages.length);
      setIsTransitioning(false);
    }, 500);
  };

  if (!products.length) {
    return <div className={styles.noProducts}>No products</div>;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={`${styles.title} ${isHot ? styles.hot : ''}`}>
          {title}
        </h2>
        <div className={styles.nav}>
          <button onClick={goToPrev} className={styles.navButton}>
            &larr;
          </button>
          <button onClick={goToNext} className={styles.navButton}>
            &rarr;
          </button>
        </div>
      </div>

      <div className={styles.container}>
        <div
          className={`${styles.track} ${isTransitioning ? styles.transition : ''}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {pages.map((group, idx) => (
            <div className={styles.page} key={idx}>
              <ProductsList products={group} isSlider={true} />
            </div>
          ))}
        </div>

        <div className={styles.dots}>
          {Array.from({ length: pages.length }, (_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === currentIndex ? styles.active : ''}`}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => setCurrentIndex(i), 500);
                setIsTransitioning(false);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
