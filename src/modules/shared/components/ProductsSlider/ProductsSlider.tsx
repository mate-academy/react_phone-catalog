import React, { useEffect, useRef, useState } from 'react';
import styles from './ProductsSlider.module.scss';
import Card from '../Card';
import { Product } from '../../types';
import classNames from 'classnames';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Props = {
  title: string;
  products: Product[];
  isHideFullPrice?: boolean;
};

const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  isHideFullPrice = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(212);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const calculateSlideWidth = () => {
    const width = window.innerWidth;

    if (width >= 1200) {
      return 286;
    }

    if (width >= 768) {
      return 237;
    }

    return 212;
  };

  useEffect(() => {
    const updateSlidesPerView = () => setSlideWidth(calculateSlideWidth());

    window.addEventListener('resize', updateSlidesPerView);
    updateSlidesPerView();

    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, products.length - 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const delta = touchStartX.current - touchEndX.current;

      if (delta > 50) {
        nextSlide();
      }

      if (delta < -50) {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className={styles.collection}>
      <h2 className={styles.collection__title}>{title}</h2>
      <div className={styles.collection__pagination + ' ' + styles.pagination}>
        <button
          onClick={prevSlide}
          className={classNames(styles.pagination__prev, {
            [styles.pagination__prev_active]: currentIndex !== 0,
          })}
          disabled={currentIndex === 0}
        >
          <IoIosArrowBack/>
        </button>
        <button
          onClick={nextSlide}
          className={classNames(styles.pagination__next, {
            [styles.pagination__next_active]: currentIndex < products.length,
          })}
        >
          <IoIosArrowForward/>
        </button>
      </div>
      <div
        className={styles.slider}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={containerRef}
      >
        <div className={styles.slider__container}>
          <div
            className={styles.slider__track}
            style={{
              transform: `translateX(-${currentIndex * slideWidth}px)`,
            }}
          >
            {products.map(item => (
              <div key={item.id} className={styles.slider__slide}>
                <Card item={item} isHideFullPrice={isHideFullPrice} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSlider;
