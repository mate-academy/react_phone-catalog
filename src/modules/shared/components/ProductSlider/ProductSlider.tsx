import React, { useEffect, useRef, useState } from 'react';
import styles from './ProductSlider.module.scss';
import { Product } from '@/types/Product';
import { ProductCard } from '../ProductCard';
import { SlideControls } from './components/SliderControls';
import { Heading } from '@/modules/shared/ui/Heading';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  // --- RESPONSIVE CONFIG ---
  // Determines how many cards (or fractions of cards) are visible based on screen width
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

  // --- MEASUREMENT EFFECT ---
  // Tracks the slider container width to recalculate card sizes on window resize
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

  // --- CALCULATIONS ---
  const visibleCards = getVisibleCount(containerWidth || 1200);

  // Dynamic calculation of card width and the translation step
  const cardWidth =
    (containerWidth - (Math.ceil(visibleCards) - 1) * GAP) / visibleCards;
  const step = cardWidth + GAP;

  // Prevents sliding into empty space at the end of the list
  const maxIndex = Math.max(0, products.length - Math.floor(visibleCards));

  // --- HANDLERS ---
  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  // --- TOUCH NAVIGATION (Mobile Swipe) ---
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
      <div className={styles.headerWrapper}></div>
      <div className={styles.slider__header}>
        <Heading as="h2">{t(title)}</Heading>

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
