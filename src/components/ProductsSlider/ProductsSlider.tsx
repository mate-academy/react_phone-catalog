import { useState, useRef } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
  hasDiscount?: boolean;
};

const CARD_WIDTH = 272;
const GAP = 16;

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  hasDiscount,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const step = CARD_WIDTH + GAP;
  const maxScroll = Math.max(0, products.length * step - step * 4);

  const handlePrev = () => {
    setScrollPosition(prev => Math.max(0, prev - step));
  };

  const handleNext = () => {
    setScrollPosition(prev => Math.min(maxScroll, prev + step));
  };

  const isPrevDisabled = scrollPosition <= 0;
  const isNextDisabled = scrollPosition >= maxScroll;

  return (
    <section className={styles.productsSlider}>
      <div className={styles.productsSlider__header}>
        <h2 className={styles.productsSlider__title}>{title}</h2>

        <div className={styles.productsSlider__buttons}>
          <button
            type="button"
            className={`${styles.productsSlider__button} ${
              isPrevDisabled ? styles['productsSlider__button--disabled'] : ''
            }`}
            onClick={handlePrev}
            disabled={isPrevDisabled}
            aria-label="Previous products"
          >
            <img src="img/icons/arrow-left.svg" alt="Previous" />
          </button>

          <button
            type="button"
            className={`${styles.productsSlider__button} ${
              isNextDisabled ? styles['productsSlider__button--disabled'] : ''
            }`}
            onClick={handleNext}
            disabled={isNextDisabled}
            aria-label="Next products"
          >
            <img src="img/icons/arrow-right.svg" alt="Next" />
          </button>
        </div>
      </div>

      <div className={styles.productsSlider__viewport}>
        <div
          ref={trackRef}
          className={styles.productsSlider__track}
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              hasDiscount={hasDiscount}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
