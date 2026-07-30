import { useRef } from 'react';
import { Product } from '@/types/Product';
import { ProductCard } from '@/components/ProductCard';
import { Icon } from '@/components/Icon';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
  showDiscount?: boolean;
};

const SCROLL_AMOUNT = 288;

export const ProductsSlider = ({
  title,
  products,
  showDiscount = true,
}: Props) => {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (offset: number) => {
    trackRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Scroll left"
            onClick={() => scrollBy(-SCROLL_AMOUNT)}
          >
            <Icon name="chevron-left" />
          </button>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Scroll right"
            onClick={() => scrollBy(SCROLL_AMOUNT)}
          >
            <Icon name="chevron-right" />
          </button>
        </div>
      </div>

      <ul className={styles.track} ref={trackRef}>
        {products.map(product => (
          <li key={product.itemId} className={styles.item}>
            <ProductCard product={product} showDiscount={showDiscount} />
          </li>
        ))}
      </ul>
    </section>
  );
};
