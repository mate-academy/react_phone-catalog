import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { Sliders } from './Sliders';
import styles from './ProductsSlider.module.scss';

interface Props {
  products: Product[];
  titleKey: string; // Translation key instead of plain text
  itemWidth?: number;
  gap?: number;
  showTitle?: boolean;
}

export const ProductsSlider: React.FC<Props> = ({ products, titleKey, itemWidth = 272, gap = 16, showTitle = true }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate how many items are visible
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    const updateVisibleItems = () => {
      if (sliderRef.current) {
        const containerWidth = sliderRef.current.offsetWidth;
        const items = Math.floor(containerWidth / (itemWidth + gap));

        setVisibleItems(Math.max(1, items));
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);

    return () => window.removeEventListener('resize', updateVisibleItems);
  }, [itemWidth, gap]);

  const maxIndex = Math.max(0, products.length - visibleItems);
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < maxIndex;

  const handlePrev = () => {
    if (canGoBack && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => Math.max(0, prev - 1));
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const handleNext = () => {
    if (canGoForward && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const translateX = -(currentIndex * (itemWidth + gap));

  const getTitleClassName = (): string => {
    // Find the slider configuration that matches the current titleKey
    const sliderConfig = Sliders.find(slider => slider.titleKey === titleKey);

    // If slider has a classModifier, apply it along with base title class
    if (sliderConfig?.classModifier) {
      const modifierClass = `title${sliderConfig.classModifier}`;

      return styles[modifierClass] || styles.title;
    }

    // Otherwise, just return the base title class
    return styles.title;
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={styles.slider}>
      {showTitle && titleKey && (
        <div className={styles.header}>
          <h2 className={getTitleClassName()}>{t(titleKey)}</h2>
          <div className={styles.controls}>
            <button className={`${styles.button} ${styles.prev} ${!canGoBack ? styles.disabled : ''}`} onClick={handlePrev} disabled={!canGoBack} aria-label="Previous" type="button">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 12L6 8L10 4" />
              </svg>
            </button>
            <button className={`${styles.button} ${styles.next} ${!canGoForward ? styles.disabled : ''}`} onClick={handleNext} disabled={!canGoForward} aria-label="Next" type="button">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 12L10 8L6 4" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className={styles.sliderContainer} ref={sliderRef}>
        <div
          className={styles.sliderTrack}
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isTransitioning ? 'transform 0.3s ease-out' : 'none',
          }}
        >
          {products.map(product => (
            <div
              key={product.id}
              className={styles.sliderItem}
              style={{
                minWidth: `${itemWidth}px`,
                marginRight: `${gap}px`,
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      {products.length > visibleItems && (
        <div className={styles.progress}>
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsTransitioning(false), 300);
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      )}
    </section>
  );
};
