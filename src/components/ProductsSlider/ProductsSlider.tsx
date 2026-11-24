import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../../types/Product';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(true);

  const handlePrev = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const handleNext = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const updateButtons = () => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    setIsAtStart(container.scrollLeft <= 0);
    setIsAtEnd(
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 1,
    );
  };

  useEffect(() => {
    updateButtons();
    window.addEventListener('resize', updateButtons);

    return () => window.removeEventListener('resize', updateButtons);
  }, [products]);

  return (
    <section className={styles.slider}>
      <div className={styles.slider__top}>
        <h2 className={styles.slider__title}>{title}</h2>

        <div className={styles.slider__buttons}>
          <button
            type="button"
            className={styles.slider__button}
            onClick={handlePrev}
            disabled={isAtStart}
            aria-label="Previous"
          >
            <img
              src={
                isAtStart
                  ? 'images/icons/arrow-left-disabled.png'
                  : 'images/icons/arrow-left.png'
              }
              alt=""
              className={styles.slider__arrow}
            />
          </button>
          <button
            type="button"
            className={styles.slider__button}
            onClick={handleNext}
            disabled={isAtEnd}
            aria-label="Next"
          >
            <img
              src={
                isAtEnd
                  ? 'images/icons/arrow-breadcrumbs.png'
                  : 'images/icons/arrow-right.png'
              }
              alt=""
              className={styles.slider__arrow}
            />
          </button>
        </div>
      </div>
      <div
        className={styles.slider__bottom}
        ref={containerRef}
        onScroll={updateButtons}
      >
        {products.map(product => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </section>
  );
};
