import { useCallback, useEffect, useRef, useState } from 'react';
import { Product } from '../../../types';
import { ProductCard } from '../../../components/ProductCard';
import styles from './ProductsSlider.module.scss';

interface ProductsSliderProps {
  title: string;
  products: Product[];
  showDiscount?: boolean;
}

export const ProductsSlider = ({
  title,
  products,
  showDiscount = true,
}: ProductsSliderProps) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);

  const updateControls = useCallback(() => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    const maxScroll = list.scrollWidth - list.clientWidth;

    setCanGoPrev(list.scrollLeft > 1);
    setCanGoNext(list.scrollLeft < maxScroll - 1);
  }, []);

  useEffect(() => {
    updateControls();

    window.addEventListener('resize', updateControls);

    return () => {
      window.removeEventListener('resize', updateControls);
    };
  }, [products, updateControls]);

  const handleSlide = (direction: number) => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    list.scrollBy({
      left: direction * list.clientWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.sliderSection}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() => handleSlide(-1)}
            disabled={!canGoPrev}
            aria-label={`Show previous ${title} product`}
          >
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => handleSlide(1)}
            disabled={!canGoNext}
            aria-label={`Show next ${title} product`}
          >
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div ref={listRef} className={styles.list} onScroll={updateControls}>
        {products.map(product => (
          <div key={product.itemId || product.id} className={styles.item}>
            <ProductCard product={product} showDiscount={showDiscount} />
          </div>
        ))}
      </div>
    </section>
  );
};
