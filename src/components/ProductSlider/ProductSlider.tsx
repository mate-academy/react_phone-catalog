import { ProductCart } from '../ProductCart';
import { Product } from '../../types/product';
import { useRef, useState, useEffect } from 'react';
import styles from './ProductSlider.module.scss';

type Props = {
  FilterredProducts: Product[];
  currentIndex: number;
  onSlide: (index: number) => void;
  isDiscounted: boolean;
  onMaxIndexChange?: (maxIndex: number) => void;
};

export const ProductSlider = ({
  FilterredProducts: products,
  currentIndex,
  onSlide,
  isDiscounted,
  onMaxIndexChange,
}: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [maxIndex, setMaxIndex] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (trackRef.current?.offsetLeft || 0));
    setScrollLeft(trackRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) {
      return;
    }

    const x = e.touches[0].pageX - (trackRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;

    if (trackRef.current) {
      trackRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const updateVisibleCount = () => {
      if (!viewportRef.current || !trackRef.current) {
        return;
      }

      const viewportWidth = viewportRef.current.offsetWidth;
      const firstCard = trackRef.current.children[0] as HTMLElement;

      if (!firstCard) {
        return;
      }

      const cardWidth = firstCard.offsetWidth;
      const gap = 12;
      const count = Math.floor((viewportWidth + gap) / (cardWidth + gap));

      setVisibleCount(Math.max(1, count));
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);

    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [products]);

  useEffect(() => {
    const newMaxIndex = Math.max(0, products.length - visibleCount);

    setMaxIndex(newMaxIndex);
    if (onMaxIndexChange) {
      onMaxIndexChange(newMaxIndex);
    }
  }, [visibleCount, products.length, onMaxIndexChange]);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      onSlide(maxIndex);
    }
  }, [currentIndex, maxIndex, onSlide]);

  const getTranslateX = () => {
    if (!trackRef.current) {
      return 0;
    }

    const firstCard = trackRef.current.children[0] as HTMLElement;

    if (!firstCard) {
      return 0;
    }

    const cardWidth = firstCard.offsetWidth;
    const gap = 12;
    const safeIndex = Math.min(currentIndex, maxIndex);

    return -(safeIndex * (cardWidth + gap));
  };

  return (
    <div className={styles.newModels}>
      <div className={styles.newModels__container}>
        <div className={styles.newModels__slider}>
          <div
            className={styles.newModels__viewport}
            ref={viewportRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={styles.newModels__track}
              ref={trackRef}
              style={{
                transform: `translateX(${getTranslateX()}px)`,
                transition: 'transform 0.3s ease',
              }}
            >
              {products.map(product => (
                <ProductCart
                  key={product.id}
                  product={product}
                  isDiscounted={isDiscounted}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
