import { useRef, useState, useEffect } from 'react';
import { Product } from '../../../../types';
import { ProductCard } from '../../../shared/components/ProductCard';
import { ICONS } from '../../../../constants';
import styles from './ProductsSlider.module.scss';

const CARD_WIDTH = 272;
const GAP = 16;
const STEP = CARD_WIDTH + GAP;

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
  const trackRef = useRef<HTMLUListElement>(null);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);

  useEffect(() => {
    const el = trackRef.current;

    if (!el) {
      return;
    }

    const updateMax = () => {
      setMaxOffset(el.scrollWidth - el.clientWidth);
    };

    updateMax();

    const observer = new ResizeObserver(updateMax);

    observer.observe(el);

    return () => observer.disconnect();
  }, [products]);

  const slidePrev = () => setOffset(prev => Math.max(0, prev - STEP));

  const slideNext = () => setOffset(prev => Math.min(maxOffset, prev + STEP));

  const canPrev = offset > 0;
  const canNext = offset < maxOffset;

  return (
    <div className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            className={`${styles.arrow} ${!canPrev ? styles.arrowDisabled : ''}`}
            onClick={slidePrev}
            disabled={!canPrev}
            aria-label="Previous products"
          >
            <img
              src={ICONS.ARROW_DOWN}
              alt=""
              aria-hidden="true"
              className={`${styles.arrowIcon} ${styles.arrowIconLeft}`}
            />
          </button>

          <button
            className={`${styles.arrow} ${!canNext ? styles.arrowDisabled : ''}`}
            onClick={slideNext}
            disabled={!canNext}
            aria-label="Next products"
          >
            <img
              src={ICONS.ARROW_DOWN}
              alt=""
              aria-hidden="true"
              className={`${styles.arrowIcon} ${styles.arrowIconRight}`}
            />
          </button>
        </div>
      </div>

      <div className={styles.viewport}>
        <ul
          ref={trackRef}
          className={styles.track}
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {products.map(product => (
            <li key={product.id} className={styles.item}>
              <ProductCard product={product} showDiscount={showDiscount} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
