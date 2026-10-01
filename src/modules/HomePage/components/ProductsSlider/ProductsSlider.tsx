import { useRef } from 'react';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../../components/ProductCard';
import { Icon } from '../../../../components/Icon/Icon';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
  showDiscount?: boolean;
};

const SCROLL_AMOUNT = 272;

export const ProductsSlider = ({
  title,
  products,
  showDiscount = true,
}: Props) => {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollByAmount = (amount: number) => {
    trackRef.current?.scrollBy({
      left: amount,
      behavior: 'smooth',
    });
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollByAmount(-SCROLL_AMOUNT)}
            aria-label="Scroll left"
          >
            <Icon name="chevronLeft" />
          </button>

          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollByAmount(SCROLL_AMOUNT)}
            aria-label="Scroll right"
          >
            <Icon name="chevronRight" />
          </button>
        </div>
      </div>

      <ul className={styles.track} ref={trackRef}>
        {products.map(product => (
          <li key={product.id} className={styles.item}>
            <ProductCard product={product} showDiscount={showDiscount} />
          </li>
        ))}
      </ul>
    </section>
  );
};
