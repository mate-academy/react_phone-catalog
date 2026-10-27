import { useRef } from 'react';

import { ProductCard } from '../ProductCard';
import type { Product } from '../../types/Product';

import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
  showDiscount?: boolean;
};

export const ProductsSlider = ({
  title,
  products,
  showDiscount = true,
}: Props) => {
  const listRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: number) => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    const firstItem = list.firstElementChild as HTMLElement | null;

    const itemWidth = firstItem?.getBoundingClientRect().width ?? 272;
    const listStyles = window.getComputedStyle(list);
    const gap = parseFloat(listStyles.columnGap) || 0;

    list.scrollBy({
      left: direction * (itemWidth + gap),
      behavior: 'smooth',
    });
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>{title}</h2>

        <div className={styles.sliderButtons}>
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label={`Previous ${title} products`}
          >
            {'<'}
          </button>

          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label={`Next ${title} products`}
          >
            {'>'}
          </button>
        </div>
      </div>

      <div className={styles.productsSlider} ref={listRef}>
        {products.map(product => (
          <div className={styles.productItem} key={product.id}>
            <ProductCard product={product} showDiscount={showDiscount} />
          </div>
        ))}
      </div>
    </section>
  );
};
