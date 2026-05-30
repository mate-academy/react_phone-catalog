import React, { useEffect, useRef, useState } from 'react';
import '@/styles/main.scss';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';
// eslint-disable-next-line import/extensions
import { ProductBrief } from '@/types/ProductBrief';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';

interface Props {
  title: string;
  products: ProductBrief[];
  loading: boolean;
  error: string;
}

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  loading = false,
  error,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (!containerRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

    // Can scroll left if not at the beginning
    setCanScrollLeft(scrollLeft > 0);

    // Can scroll right if not at the end (with small tolerance for rounding)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    // Check initial state
    checkScrollButtons();

    // Add scroll event listener
    container.addEventListener('scroll', checkScrollButtons);

    // Add resize event listener to recheck on window resize
    window.addEventListener('resize', checkScrollButtons);

    return () => {
      container.removeEventListener('scroll', checkScrollButtons);
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, [products]);

  const scrollByVisibleWidth = (direction: 'left' | 'right') => {
    if (!containerRef.current) {
      return;
    }

    const isDesktop = window.innerWidth >= 1200;

    let scrollAmount;

    if (isDesktop) {
      // On desktop: scroll by exactly one item width + gap
      // Each item is 25% of container width, plus 16px gap
      const containerWidth = containerRef.current.offsetWidth;
      const itemWidth = (containerWidth - 48) / 4; // 25% of container

      scrollAmount = (itemWidth + 16) * 2;
    } else {
      // On mobile/tablet: scroll by full container width as before
      scrollAmount = containerRef.current.offsetWidth;
    }

    containerRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  if (error && !loading && products.length === 0) {
    return (
      <div className={styles.product_carousel}>
        <div className={styles.product_carousel__controls}>
          <h2>{title}</h2>
        </div>
        <div className={styles.product_carousel__products}>
          <ErrorMessage message={error}></ErrorMessage>
        </div>
      </div>
    );
  }

  if (!error && loading) {
    return (
      <div className={styles.product_carousel}>
        <div className={styles.product_carousel__controls}>
          <h2>{title}</h2>
        </div>
        <div className={styles.product_carousel__products}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.product_carousel}>
      <div className={styles.product_carousel__controls}>
        <h2>{title}</h2>
        <div className={styles['product_carousel__controls--buttons']}>
          <button
            aria-label="Previous products"
            className="button__circle button__circle--arrow"
            onClick={() => {
              scrollByVisibleWidth('left');
            }}
            disabled={!canScrollLeft}
          >
            <i className="icon icon--left"></i>
          </button>
          <button
            aria-label="Next products"
            className="button__circle button__circle--arrow"
            onClick={() => {
              scrollByVisibleWidth('right');
            }}
            disabled={!canScrollRight}
          >
            <i className="icon icon--right"></i>
          </button>
        </div>
      </div>
      <div ref={containerRef} className={styles.product_carousel__products}>
        {products.map((p: ProductBrief) => (
          <ProductCard
            key={p.id}
            product={p}
            link={`/${p.category}/${p.itemId}`}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
};
