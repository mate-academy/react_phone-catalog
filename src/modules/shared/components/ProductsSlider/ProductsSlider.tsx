import { useRef } from 'react';
import type { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { ArrowLeftIcon, ArrowRightIcon } from '../Icons/Icons';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
  /** Brand new models are shown at full price, without an old price. */
  withDiscount?: boolean;
};

export const ProductsSlider = ({
  title,
  products,
  withDiscount = true,
}: Props) => {
  const listRef = useRef<HTMLDivElement>(null);

  const scrollByStep = (direction: 1 | -1) => () => {
    const list = listRef.current;

    if (list) {
      list.scrollBy({
        left: direction * Math.round(list.clientWidth * 0.8),
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={styles.slider}>
      <div className={styles.topline}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.arrows}>
          <button
            type="button"
            aria-label={`Scroll ${title} backward`}
            onClick={scrollByStep(-1)}
          >
            <ArrowLeftIcon size={14} />
          </button>
          <button
            type="button"
            aria-label={`Scroll ${title} forward`}
            onClick={scrollByStep(1)}
          >
            <ArrowRightIcon size={14} />
          </button>
        </div>
      </div>

      <div className={styles.list} ref={listRef}>
        {products.map(product => (
          <ProductCard
            key={product.itemId}
            product={product}
            withDiscount={withDiscount}
          />
        ))}
      </div>
    </section>
  );
};
