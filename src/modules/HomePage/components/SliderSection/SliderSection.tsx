import React, { useRef, useEffect, useState } from 'react';
import { Product } from '../../../shared/types';
import { ProductCard } from '../../../CategoryPage/components/ProductCard';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;

    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);

      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) {
      return;
    }

    const cardWidth =
      scrollRef.current.querySelector<HTMLElement>('.card')?.offsetWidth || 300;
    const gap = 16;
    const scrollAmount = cardWidth + gap;

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!products.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={`${styles.title} ${isHot ? styles.hot : ''}`}>
          {title}
        </h2>
        <div className={styles.nav}>
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={styles.navButton}
          >
            &lt;
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={styles.navButton}
          >
            &gt;
          </button>
        </div>
      </div>

      <div className={styles.container}>
        <div ref={scrollRef} className={styles.track} onScroll={checkScroll}>
          {products.map(product => (
            <div key={product.id} className={styles.cardWrapper}>
              <ProductCard product={product} />
            </div>
          ))}
          {products.length > 0 && (
            <div className={styles.peekCard}>
              <ProductCard product={products[0]} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
