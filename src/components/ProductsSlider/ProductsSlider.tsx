import React, { useRef, useState } from 'react';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

interface Props {
  title: string;
  products: Product[];
  className?: string;
  showDiscount?: boolean;
}

export const ProductsSlider = ({
  title,
  products,
  className,
  showDiscount = true,
}: Props) => {
  const [position, setPosition] = useState(0);
  const touchStartX = useRef(0);

  //#region Handle slider
  const getCardStep = () => {
    if (window.innerWidth >= 1200) {
      return 288;
    }

    if (window.innerWidth >= 640) {
      return 253;
    }

    return 228;
  };

  const maxPosition = products.length - 1;
  const handleNext = () => setPosition(prev => Math.min(prev + 1, maxPosition));
  const handlePrev = () => setPosition(prev => Math.max(prev - 1, 0));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };
  //#endregion

  return (
    <div className={`${styles.slider} ${className ?? ''}`}>
      <div className={styles.topSlider}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttons}>
          <button
            onClick={handlePrev}
            disabled={position === 0}
            className={styles.buttonLeft}
          />
          <button
            type="button"
            onClick={handleNext}
            disabled={position >= maxPosition}
            className={styles.buttonRight}
          />
        </div>
      </div>
      <div className={styles.trackWrapper}>
        <div
          className={styles.track}
          style={{ transform: `translateX(${-position * getCardStep()}px)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {products.map(product => (
            <ProductCard
              product={product}
              key={product.id}
              variant={'slider'}
              showDiscount={showDiscount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
