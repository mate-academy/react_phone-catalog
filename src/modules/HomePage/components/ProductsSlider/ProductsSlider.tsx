import { useCallback, useEffect, useRef, useState } from 'react';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../shared/components/ProductCard';
import { ChevronLeftIcon, ChevronRightIcon } from '../../../shared/ui/Icons/Icons';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider = ({ title, products }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(products.length > 0);

  const updateControls = useCallback(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    setCanScrollLeft(slider.scrollLeft > 1);
    setCanScrollRight(slider.scrollLeft < maxScrollLeft - 1);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    updateControls();
    slider.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);

    return () => {
      slider.removeEventListener('scroll', updateControls);
      window.removeEventListener('resize', updateControls);
    };
  }, [products.length, updateControls]);

  const scroll = (direction: 'left' | 'right') => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const scrollAmount = Math.max(slider.clientWidth * 0.8, 280);

    if (direction === 'left') {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label={`Rolar ${title} para a esquerda`}
          >
            <ChevronLeftIcon />
          </button>

          <button
            type="button"
            className={styles.arrow}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label={`Rolar ${title} para a direita`}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div ref={sliderRef} className={styles.track}>
        {products.map(product => (
          <div key={product.itemId} className={styles.item}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
