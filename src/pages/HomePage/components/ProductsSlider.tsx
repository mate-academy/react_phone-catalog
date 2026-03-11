import React, { useEffect, useRef, useState } from 'react';
import { Product } from '@/types/Product';
import { ProductCard } from '@components/product/ProductCard';
import styles from '../HomePage.module.scss';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [scrollState, setScrollState] = useState({
    isAtStart: true,
    isAtEnd: false,
  });
  const [isMoved, setIsMoved] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const updateScrollState = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setScrollState({
        isAtStart: scrollLeft <= 0,
        isAtEnd: scrollLeft + clientWidth >= scrollWidth - 1,
      });
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector('article');
      const step = (card?.offsetWidth || 272) + 16;

      sliderRef.current.scrollBy({
        left: direction === 'left' ? -step : step,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDragging.current = true;
    setIsMoved(false);
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftStart.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.cursor = 'grabbing';
    sliderRef.current.style.scrollBehavior = 'auto';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const distance = x - startX.current;

    if (Math.abs(distance) > 5) {
      setIsMoved(true);
    }
    sliderRef.current.scrollLeft = scrollLeftStart.current - distance;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'pointer';
      sliderRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleChildClick = (e: React.MouseEvent) => {
    if (isMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', updateScrollState);
      updateScrollState();
      return () => slider.removeEventListener('scroll', updateScrollState);
    }
  }, [products]);

  return (
    <section className={styles.section}>
      <div className={styles['section__header']}>
        <h2 className={styles['section__title']}>{title}</h2>
        <div className={styles['section__arrows']}>
          <button
            type="button"
            className={`${styles['arrow-btn']} ${styles['arrow-btn--prev']}`}
            onClick={() => scroll('left')}
            disabled={scrollState.isAtStart}
          />
          <button
            type="button"
            className={`${styles['arrow-btn']} ${styles['arrow-btn--next']}`}
            onClick={() => scroll('right')}
            disabled={scrollState.isAtEnd}
          />
        </div>
      </div>

      <div
        className={styles['products-slider']}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onClickCapture={handleChildClick}
        style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        <div className={styles['products-slider__track']}>
          {products.map((product) => (
            <div
              key={product.id}
              onDragStart={(e) => e.preventDefault()}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
