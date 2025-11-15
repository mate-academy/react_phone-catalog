import { FC, useCallback, useEffect, useMemo, useState, useRef } from 'react';

import { ProductCard } from '../../../shared/components/ProductCard';
import { Product } from '../../../shared/types/Product';
import { IconButton } from '../../../shared/components/IconButton';

import styles from './ProductSlider.module.scss';

type Props = {
  products: Product[];
  header: string;
  displayType?: 'regular' | 'discount';
};

export const ProductSlider: FC<Props> = ({
  products,
  header,
  displayType = 'regular',
}) => {
  const [cardWidth, setCardWidth] = useState(272);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1136);
  const viewportRef = useRef<HTMLDivElement>(null);
  const gap = 16;

  useEffect(() => {
    const updateDimensions = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 640) {
        setCardWidth(212);
      } else if (screenWidth < 1200) {
        setCardWidth(237);
      } else {
        setCardWidth(272);
      }

      if (viewportRef.current) {
        setViewportWidth(viewportRef.current.offsetWidth);
      }
    };

    updateDimensions();

    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const totalWidth = useMemo(() => {
    return products.length * cardWidth + (products.length - 1) * gap;
  }, [products.length, cardWidth, gap]);

  const maxIndex = useMemo(() => {
    if (!viewportWidth || !cardWidth) {
      return 0;
    }

    if (totalWidth <= viewportWidth) {
      return 0;
    }

    const maxOffset = totalWidth - viewportWidth;

    return Math.ceil(maxOffset / (cardWidth + gap));
  }, [totalWidth, cardWidth, viewportWidth, gap]);

  const handleNext = useCallback(() => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, maxIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [currentIndex, maxIndex]);

  return (
    <section className={styles.slider}>
      <div className={styles.slider__wrapper}>
        <div className={styles.slider__header}>
          <h2 className={styles.slider__title}>{header}</h2>

          <div className={styles.slider__buttons}>
            <IconButton
              icon="arrow_left"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            />

            <IconButton
              icon="arrow_right"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
            />
          </div>
        </div>

        <div className={styles.slider__viewport} ref={viewportRef}>
          <div
            className={styles.slider__track}
            style={{
              transform: `translateX(-${Math.min(
                currentIndex * (cardWidth + gap),
                totalWidth - viewportWidth,
              )}px)`,
            }}
          >
            {products.map(product => (
              <div key={product.id} style={{ width: `${cardWidth}px` }}>
                <ProductCard product={product} displayType={displayType} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
