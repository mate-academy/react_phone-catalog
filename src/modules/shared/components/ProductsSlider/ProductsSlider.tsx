import React, { useRef } from 'react';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.offsetWidth;

      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={styles.slider}>
      <div className={styles.slider__header}>
        <h2 className={styles.slider__title}>{title}</h2>

        <div className={styles.slider__buttons}>
          <button
            type="button"
            onClick={() => scroll('left')}
            className={styles.slider__btn}
            aria-label="Previous products"
          >
            <img src="img/icons/Arrow-left.svg" alt="Left" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className={styles.slider__btn}
            aria-label="Next products"
          >
            <img src="img/icons/Arrow-right.svg" alt="Right" />
          </button>
        </div>
      </div>

      <div className={styles.slider__content} ref={containerRef}>
        {products.map(product => (
          <div key={product.id} className={styles.slider__item}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
