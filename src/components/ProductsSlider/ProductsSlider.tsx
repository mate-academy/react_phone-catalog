import { useCallback, useEffect, useRef, useState } from 'react';
import type { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import { IconChevronLeft, IconChevronRight } from '../Icons';
import styles from './ProductsSlider.module.scss';

const GAP = 16;

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
  const listRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = useCallback(() => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    setCanPrev(list.scrollLeft > 0);
    setCanNext(list.scrollLeft + list.clientWidth < list.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateButtons();

    const list = listRef.current;

    if (!list) {
      return undefined;
    }

    list.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);

    return () => {
      list.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
    };
  }, [updateButtons, products]);

  const scrollByStep = (direction: 1 | -1) => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    const firstItem = list.firstElementChild as HTMLElement | null;
    const itemWidth = firstItem ? firstItem.offsetWidth + GAP : 288;
    const visible = Math.max(1, Math.floor(list.clientWidth / itemWidth));

    list.scrollBy({
      left: direction * itemWidth * visible,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.slider}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.button}
            aria-label="Previous"
            disabled={!canPrev}
            onClick={() => scrollByStep(-1)}
          >
            <IconChevronLeft />
          </button>

          <button
            type="button"
            className={styles.button}
            aria-label="Next"
            disabled={!canNext}
            onClick={() => scrollByStep(1)}
          >
            <IconChevronRight />
          </button>
        </div>
      </div>

      <ul className={styles.list} ref={listRef}>
        {products.map(product => (
          <li className={styles.item} key={product.itemId}>
            <ProductCard product={product} showDiscount={showDiscount} />
          </li>
        ))}
      </ul>
    </section>
  );
};
