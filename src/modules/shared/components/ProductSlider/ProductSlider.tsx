import React, { useEffect, useRef, useState } from 'react';
import styles from './ProductSlider.module.scss';
import { Product } from '@/types/Product';
import { ProductCard } from '../ProductCard';
import { SlideControls } from '../SliderControls';
import { Heading } from '@/components/ui/Heading';

interface Props {
  products: Product[];
  title: string;
}

const GAP = 16;

export const ProductSlider: React.FC<Props> = ({ products, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // how many cards will be visible
  const getVisibleCount = (w: number) => {
    if (w >= 1200) {
      return 4;
    }

    if (w >= 768) {
      return 3.5;
    }

    if (w >= 500) {
      return 2.2;
    }

    return 1.3;
  };

  // real card width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const visibleCards = getVisibleCount(containerWidth || 1200);

  // dynamic width
  const cardWidth =
    (containerWidth - (Math.ceil(visibleCards) - 1) * GAP) / visibleCards;
  const step = cardWidth + GAP;

  const maxIndex = Math.max(0, products.length - Math.floor(visibleCards));

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext();
    }

    if (diff < -50) {
      handlePrev();
    }
  };

  return (
    <section className={styles.slider}>
      <div className={styles.slider__header}>
        <Heading as="h2">{title}</Heading>

        <SlideControls
          onNext={handleNext}
          onPrev={handlePrev}
          isPrevDisabled={currentIndex === 0}
          isNextDisabled={currentIndex >= maxIndex}
        />
      </div>

      <div
        className={styles.slider__viewport}
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.slider__track}
          style={{
            transform: `translateX(-${currentIndex * step}px)`,
          }}
        >
          {products.map(product => (
            <div
              key={product.id}
              className={styles.slider__item}
              style={{ width: `${cardWidth}px` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
