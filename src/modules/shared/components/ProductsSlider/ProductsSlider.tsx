import { useCallback, useEffect, useRef, useState } from 'react';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard';
import ArrowLeftIcon from '../../../../assets/icons/arrow-left.svg?react';
import ArrowRightIcon from '../../../../assets/icons/arrow-right.svg?react';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
  showDiscount?: boolean;
}

export const ProductsSlider = ({
  title,
  products,
  showDiscount = true,
}: Props) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateButtons = useCallback(() => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    setCanScrollPrev(list.scrollLeft > 0);
    setCanScrollNext(list.scrollLeft + list.clientWidth < list.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateButtons();
    window.addEventListener('resize', updateButtons);

    return () => {
      window.removeEventListener('resize', updateButtons);
    };
  }, [updateButtons]);

  const scroll = (direction: 1 | -1) => {
    const list = listRef.current;
    const firstItem = list?.firstElementChild;

    if (!list || !firstItem) {
      return;
    }

    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const step = firstItem.getBoundingClientRect().width + gap;

    list.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.button}
            onClick={() => scroll(-1)}
            disabled={!canScrollPrev}
            aria-label="Previous products"
          >
            <ArrowLeftIcon />
          </button>

          <button
            type="button"
            className={styles.button}
            onClick={() => scroll(1)}
            disabled={!canScrollNext}
            aria-label="Next products"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      <ul ref={listRef} className={styles.list} onScroll={updateButtons}>
        {products.map(product => (
          <li key={product.id} className={styles.item}>
            <ProductCard product={product} showDiscount={showDiscount} />
          </li>
        ))}
      </ul>
    </section>
  );
};
