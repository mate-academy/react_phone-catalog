import { useEffect, useRef, useState } from 'react';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard';
import { Icon } from '../Icon';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider = ({ title, products }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateButtons = () => {
    const el = trackRef.current;

    if (!el) {
      return;
    }

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateButtons();
    const el = trackRef.current;

    if (!el) {
      return undefined;
    }

    el.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);

    return () => {
      el.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
    };
  }, [products]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;

    if (!el) {
      return;
    }

    const card = el.querySelector('[data-card]') as HTMLElement | null;
    const amount = card ? card.offsetWidth + 16 : 288;

    el.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.button}
            disabled={!canScrollLeft}
            aria-label="Previous products"
            onClick={() => scrollByCard(-1)}
          >
            <Icon name="arrow-left" />
          </button>
          <button
            type="button"
            className={styles.button}
            disabled={!canScrollRight}
            aria-label="Next products"
            onClick={() => scrollByCard(1)}
          >
            <Icon name="arrow-right" />
          </button>
        </div>
      </div>

      <div className={styles.track} ref={trackRef}>
        {products.map(product => (
          <div key={product.id} className={styles.card} data-card>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
