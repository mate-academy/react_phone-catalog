import React, { useEffect, useState } from 'react';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../../types';
import { ProductCard } from '../ProductCard/ProductCard';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { useSwipe } from '../../../hooks/useSwipe';
import { ProductCardSkeleton } from '../ProductCardSkeleton/ProductCardSkeleton';

type Props = {
  title: string;
  products: Product[];
  loading?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  loading = false,
}) => {
  const [index, setIndex] = useState(0);

  const width = useWindowWidth();
  const visibleCount = width >= 1200 ? 4 : width >= 640 ? 3 : 1;
  const maxIndex = Math.max(products.length - visibleCount, 0);

  const getTransform = () => {
    const gap = 16;

    if (width >= 1200) {
      return `translateX(calc(-${index} * (100% / 4 + ${gap}px / 4)))`;
    }

    if (width >= 640) {
      return `translateX(-${index * (237 + gap)}px)`;
    }

    return `translateX(-${index * (212 + gap)}px)`;
  };

  const prev = () => setIndex(i => Math.max(i - 1, 0));
  const next = () => setIndex(i => Math.min(i + 1, maxIndex));

  const { handleTouchStart, handleTouchEnd } = useSwipe({
    onSwipeLeft: next,
    onSwipeRight: prev,
  });

  useEffect(() => {
    setIndex(0);
  }, [products]);

  const renderSkeletons = () =>
    Array.from({ length: visibleCount }).map((_, i) => (
      <div key={i} className={styles.card}>
        <ProductCardSkeleton />
      </div>
    ));

  const renderProducts = () =>
    products.map(product => (
      <div key={product.id} className={styles.card}>
        <ProductCard product={product} />
      </div>
    ));

  return (
    <div className={styles.slider}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttons}>
          <button
            onClick={prev}
            disabled={index === 0 || loading}
            className={styles.btn}
          >
            <img src="/img/icons/arrow-left.svg" alt="left" />
          </button>
          <button
            onClick={next}
            disabled={index === maxIndex || loading}
            className={styles.btn}
          >
            <img src="/img/icons/arrow-right.svg" alt="right" />
          </button>
        </div>
      </div>

      <div
        className={styles.viewport}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.track} style={{ transform: getTransform() }}>
          {loading ? renderSkeletons() : renderProducts()}
        </div>
      </div>
    </div>
  );
};
