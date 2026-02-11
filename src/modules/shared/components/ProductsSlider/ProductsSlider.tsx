import { useMemo, useState } from 'react';
import { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
  hotPrice: boolean;
}

const PER_PAGE = 4;

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  hotPrice,
}) => {
  const [index, setIndex] = useState(0);

  const visible = useMemo(() => {
    if (products.length <= PER_PAGE) {
      return products;
    }

    return Array.from({ length: PER_PAGE }, (_, offset) => {
      const nextIndex = (index + offset) % products.length;

      return products[nextIndex];
    });
  }, [index, products]);

  const showArrows = products.length > PER_PAGE;

  if (!products.length) {
    return null;
  }

  const handlePrev = () => {
    setIndex(prev =>
      prev - 1 < 0 ? Math.max(products.length - 1, 0) : prev - 1,
    );
  };

  const handleNext = () => {
    setIndex(prev => (prev + 1) % products.length);
  };

  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {showArrows && (
          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.arrow}
              onClick={handlePrev}
              aria-label="Previous products"
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.arrow}
              onClick={handleNext}
              aria-label="Next products"
            >
              ›
            </button>
          </div>
        )}
      </div>

      <div className={styles.row}>
        {visible.map(product => (
          <ProductCard
            key={product.itemId}
            product={product}
            hotPrice={hotPrice}
          />
        ))}
      </div>
    </section>
  );
};
