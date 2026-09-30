import { useState } from 'react';
import { Product } from '../../../shared/types';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../../../shared/components/ProductCard';
import classNames from 'classnames';

interface Props {
  title: string;
  products: Product[];
  isDiscountHidden?: boolean;
}

export const ProductSlider: React.FC<Props> = ({
  products,
  title,
  isDiscountHidden = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const CARD_WIDTH = 212;
  const VISIBLE_CARDS = 4;
  const GAP = 16;
  const STEP_WIDTH = CARD_WIDTH + GAP;

  const maxIndex = Math.max(0, products.length - VISIBLE_CARDS);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.buttons}>
          <button
            type="button"
            className={classNames(styles.button, styles.buttonPrev)}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous products"
          >
            <img
              src={
                currentIndex === 0
                  ? './img/icons/arrow-left-disabled.svg'
                  : './img/icons/arrow-left.svg'
              }
              alt=""
            />
          </button>

          <button
            type="button"
            className={classNames(styles.button, styles.buttonNext)}
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next products"
          >
            <img
              src={
                currentIndex >= maxIndex
                  ? './img/icons/arrow-right-disabled.svg'
                  : './img/icons/arrow-right.svg'
              }
              alt=""
            />
          </button>
        </div>
      </div>

      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{
            transform: `translateX(-${currentIndex * STEP_WIDTH}px)`,
          }}
        >
          {products.map(product => (
            <div key={product.id} className={styles.cardWrapper}>
              <ProductCard
                product={product}
                isDiscountHidden={isDiscountHidden}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
