import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Product } from '../../features/types/productType';
import styles from './ProductsCarousel.module.scss';
import { Chevron } from '../icons/Chevron';
import { ProductCard } from '../ProductCard';
import { SecondaryButton } from '../SecondaryButton';

type Props = {
  title: string;
  products: Product[];
  showDiscount?: boolean;
};

export const ProductsCarousel: React.FC<Props> = ({
  title,
  products,
  showDiscount = false,
}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = carouselRef.current;

    if (!el) {
      return;
    }

    const left = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    setCanScrollLeft(left > 1);
    setCanScrollRight(left < maxScrollLeft - 1);
  }, []);

  useEffect(() => {
    updateArrows();
  }, [products, updateArrows]);

  useEffect(() => {
    const el = carouselRef.current;

    if (!el) {
      return;
    }

    const onScroll = () => updateArrows();
    const onResize = () => updateArrows();

    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [updateArrows]);

  const scrollByStep = (direction: 'left' | 'right') => {
    const el = carouselRef.current;

    if (!el) {
      return;
    }

    const step = el.clientWidth;

    el.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carousel__header}>
        <h2 className={styles.carousel__title}>{title}</h2>
        <div className={styles.carousel__actions}>
          <SecondaryButton
            onClick={() => scrollByStep('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <Chevron direction="left" />
          </SecondaryButton>
          <SecondaryButton
            onClick={() => scrollByStep('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <Chevron direction="right" />
          </SecondaryButton>
        </div>
      </div>
      <div ref={carouselRef} className={styles.carousel__track}>
        {products.map(product => (
          <div key={product.id} className={styles.carousel__item}>
            <ProductCard product={product} showDiscount={showDiscount} />
          </div>
        ))}
      </div>
    </div>
  );
};
