import React, { useState, useEffect } from 'react';
import { Products } from '../../../../types/Products';
import { ProductCard } from '../ProductCard';
import styles from './ProductSlider.module.scss';
import ArrowLeft from '../../../../images/icons/Arrow Left.png';
import ArrowRight from '../../../../images/icons/Arrow Right.png';

interface Props {
  products: Products[];
  title: string;
}

export const ProductSlider: React.FC<Props> = ({ products, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCardsCount, setVisibleCardsCount] = useState(3);

  const updateVisibleCardsCount = () => {
    const width = window.innerWidth;

    switch (true) {
      case width < 440:
        setVisibleCardsCount(1);
        break;
      case width < 640:
        setVisibleCardsCount(2);
        break;
      case width < 1200:
        setVisibleCardsCount(3);
        break;
      default:
        setVisibleCardsCount(4);
        break;
    }
  };

  useEffect(() => {
    updateVisibleCardsCount();
    window.addEventListener('resize', updateVisibleCardsCount);

    return () => {
      window.removeEventListener('resize', updateVisibleCardsCount);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1,
    );
  };

  return (
    <section className={styles['product-slider']}>
      <div className={styles['product-slider__header']}>
        <h2 className={styles['product-slider__title']}>{title}</h2>

        <div className={styles['product-slider__button']}>
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`
              ${styles['product-slider__btn']}
              ${styles['product-slider__btn--prev']}
            `}
          >
            <img
              src={ArrowLeft}
              className={styles['product-slider__btn-icon']}
              alt="PrevImage"
            />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex === products.length - visibleCardsCount}
            className={`
              ${styles['product-slider__btn']}
              ${styles['product-slider__btn--next']}
            `}
          >
            <img
              src={ArrowRight}
              className={styles['product-slider__btn-icon']}
              alt="NextImage"
            />
          </button>
        </div>
      </div>

      <div className={styles['product-slider__wrapp']}>
        <ul className={styles['product-slider__list']}>
          {products.map(product => {
            return (
              <li
                key={product.id}
                className={styles['product-slider__item']}
                style={{
                  transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 16}px))`,
                }}
              >
                <ProductCard products={product} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
