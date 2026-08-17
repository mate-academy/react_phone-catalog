import { useState } from 'react';
import { Product } from '../../../shared/types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
// eslint-disable-next-line max-len
import { ProductCardSkeleton } from '../Skeletons/ProductCardSkeleton/ProductCardSkeleton';

import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
  isLoading?: boolean;
}

export const ProductsSlider = ({
  title,
  products,
  isLoading = false,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const STEP = 288;

  const maxIndex = Math.max(0, products.length - 4);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const renderContent = () => {
    if (isLoading) {
      return [1, 2, 3, 4].map(id => (
        <div key={id} className={styles.slider__slide}>
          <ProductCardSkeleton />
        </div>
      ));
    }

    const isDiscounted = title === 'Hot prices';

    return products.map(product => (
      <div key={product.id} className={styles.slider__slide}>
        <ProductCard product={product} isDiscounted={isDiscounted} />
      </div>
    ));
  };

  return (
    <section className={styles.slider}>
      <div className={styles.slider__header}>
        <h2 className={styles.slider__title}>{title}</h2>

        <div className={styles.slider__buttons}>
          <button
            type="button"
            className={styles.slider__btn}
            aria-label="Previous"
            onClick={handlePrev}
            disabled={isLoading || currentIndex === 0}
          >
            {'<'}
          </button>
          <button
            type="button"
            className={styles.slider__btn}
            aria-label="Next"
            onClick={handleNext}
            disabled={isLoading || currentIndex >= maxIndex}
          >
            {'>'}
          </button>
        </div>
      </div>

      <div className={styles.slider__viewport}>
        <div
          className={styles.slider__track}
          style={{
            transform: `translateX(-${currentIndex * STEP}px)`,
          }}
        >
          {renderContent()}
        </div>
      </div>
    </section>
  );
};
