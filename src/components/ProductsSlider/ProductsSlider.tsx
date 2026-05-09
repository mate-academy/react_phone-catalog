import { useEffect, useRef, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
  showDiscount?: boolean;
}

export const ProductsSlider = ({ title, products, showDiscount }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [products]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(`.${styles.cardWrap}`) as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: 'smooth' });
  };

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>

      <div className={styles.track} ref={trackRef}>
        {products.map(p => (
          <div key={p.id} className={styles.cardWrap}>
            <ProductCard product={p} showDiscount={showDiscount} />
          </div>
        ))}
      </div>
    </section>
  );
};
