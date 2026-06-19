import React from 'react';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../../../shared/components/ProductCard';
import { useSlider } from '../../../shared/hooks/useSlider';
import { Product } from '../../../../types/product';

type Props = {
  products: Product[];
  title: string;
};

export const ProductSlider: React.FC<Props> = ({ products, title }) => {
  const {
    currentSlide,
    sliderRef,
    maxSlide,
    handlePrevSlide,
    handleNextSlide,
    translateValue,
  } = useSlider(products.length);

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.topBar}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.arrows}>
          <button
            className={styles.arrow}
            disabled={currentSlide === 0}
            onClick={handlePrevSlide}
            aria-label="Previous slide"
          >
            <img src="/img/icons/left.svg" alt="" />
          </button>

          <button
            className={styles.arrow}
            disabled={currentSlide >= maxSlide}
            onClick={handleNextSlide}
            aria-label="Next slide"
          >
            <img src="/img/icons/right.svg" alt="" />
          </button>
        </div>
      </div>

      <div className={styles.sliderWindow} ref={sliderRef}>
        <section
          className={styles.productSlider}
          style={{
            transform: `translateX(-${translateValue}px)`,
          }}
        >
          {products.map(product => (
            <div key={product.id} className={styles.cardWrapper} data-card>
              <ProductCard product={product} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
