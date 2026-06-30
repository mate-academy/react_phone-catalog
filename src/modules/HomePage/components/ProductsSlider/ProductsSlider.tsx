import React, { useState, useRef, useEffect } from 'react';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../../../../components/ProductCard';
import { Product } from '../../../../types/Product';

interface Props {
  title: string;
  products: Product[];
  hideDiscount?: boolean;
}

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  hideDiscount = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stepSize, setStepSize] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateStep = () => {
      if (trackRef.current && trackRef.current.children[0]) {
        const firstCard = trackRef.current.children[0] as HTMLElement;
        const cardWidth = firstCard.getBoundingClientRect().width;
        const gap = 16;

        setStepSize(cardWidth + gap);
      }
    };

    const timer = setTimeout(calculateStep, 50);

    const observer = new ResizeObserver(calculateStep);

    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    window.addEventListener('resize', calculateStep);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('resize', calculateStep);
    };
  }, [products]);

  let visibleCardsCount = 1;

  if (stepSize > 0 && trackRef.current?.parentElement) {
    visibleCardsCount = Math.max(
      1,
      Math.floor(trackRef.current.parentElement.offsetWidth / stepSize),
    );
  }

  const maxIndex = Math.max(0, products.length - visibleCardsCount);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slider__header}>
        <h2 className={styles.slider__title}>{title}</h2>

        <div className={styles.slider__buttons}>
          <button
            className={styles.slider__btn}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <img src="/icons/arrow-left.svg" alt="prev" />
          </button>
          <button
            className={styles.slider__btn}
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
          >
            <img src="/icons/arrow-right.svg" alt="next" />
          </button>
        </div>
      </div>

      <div className={styles.slider__window}>
        <div
          className={styles.slider__track}
          ref={trackRef}
          style={{ transform: `translateX(-${currentIndex * stepSize}px)` }}
        >
          {products.map(product => (
            <div className={styles.slider__item} key={product.id}>
              <ProductCard product={product} hideDiscount={hideDiscount} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
