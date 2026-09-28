import { useRef } from 'react';

import { Product } from '../../modules/shared/types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
};

const CARD_STEP = 288;

export const ProductsSlider = ({ title, products }: Props) => {
  const listRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: -1 | 1) => {
    listRef.current?.scrollBy({
      left: CARD_STEP * direction,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>

        <div className={styles.controls}>
          <button
            type="button"
            aria-label="Previous products"
            onClick={() => handleScroll(-1)}
          >
            <i className="fa-solid fa-chevron-left" />
          </button>

          <button
            type="button"
            aria-label="Next products"
            onClick={() => handleScroll(1)}
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      </div>

      <div className={styles.slider} ref={listRef}>
        {products.map(product => (
          <div className={styles.slide} key={product.itemId}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
