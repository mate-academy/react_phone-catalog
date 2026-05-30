import React, { useMemo } from 'react';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../../../types/product';
import { ProductCard } from '../../../shared/components/ProductCard';
import { useSlider } from '../../../shared/hooks/useSlider';

type Props = {
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ products }) => {
  const {
    currentSlide,
    sliderRef,
    maxSlide,
    handlePrevSlide,
    handleNextSlide,
    translateValue,
  } = useSlider(products.length);

  const hotPrice = useMemo(() => {
    return [...products].sort((productA, productB) => {
      const discountA = (productA.fullPrice ?? 0) - (productA.price ?? 0);
      const discountB = (productB.fullPrice ?? 0) - (productB.price ?? 0);

      return discountB - discountA;
    });
  }, [products]);

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.topBar}>
        <h2 className={styles.title}>Hot prices</h2>

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
          {hotPrice.map(product => (
            <div key={product.id} className={styles.cardWrapper} data-card>
              <ProductCard product={product} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
