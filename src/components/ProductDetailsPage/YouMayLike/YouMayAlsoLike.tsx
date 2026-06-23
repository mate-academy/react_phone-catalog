import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import styles from './YouMayAlsoLike.module.scss';
import phonesData from '../../../../public/api/phones.json';
import { ProductCard } from '../../ProductCard/ProductCard';

type RawProduct = {
  id: string;
  namespaceId?: string;
  name?: string;
  images?: string[];
  priceRegular?: number;
  priceDiscount?: number;
  year?: number;
  releaseDate?: string;
};

function getSuggestedProducts(
  products: RawProduct[],
  count: number = 8,
): RawProduct[] {
  const shuffled = [...products].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
}

export function YouMayAlsoLikeSlider() {
  const products = phonesData as unknown as RawProduct[];

  const suggestedProducts = useMemo(
    () => getSuggestedProducts(products),
    [products],
  );

  const GAP = 16;
  const MIN_CARD = 272;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const startIndexRef = useRef(0);

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    startIndexRef.current = startIndex;
  }, [startIndex]);

  const [visibleCount, setVisibleCount] = useState(4);
  const [itemWidth, setItemWidth] = useState(0);
  const [translatePx, setTranslatePx] = useState(0);

  const computeVisibleByContainer = useCallback((containerWidth: number) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1200) {
      return 4;
    }
    const min4 = 4 * MIN_CARD + 3 * GAP;
    const min3 = 3 * MIN_CARD + 2 * GAP;
    const min2 = 2 * MIN_CARD + 1 * GAP;
    if (containerWidth >= min4) return 4;
    if (containerWidth >= min3) return 3;
    if (containerWidth >= min2) return 2;

    return 1;
  }, []);

  const recompute = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const newVisible = computeVisibleByContainer(containerWidth);

    setVisibleCount(prev => (prev === newVisible ? prev : newVisible));

    const maxStart = Math.max(0, suggestedProducts.length - newVisible);
    const curStart = startIndexRef.current;
    const newStart = Math.min(curStart, maxStart);

    if (newStart !== curStart) {
      setStartIndex(newStart);
      startIndexRef.current = newStart;
    }

    const totalGaps = GAP * (newVisible - 1);
    const w = Math.max(0, (containerWidth - totalGaps) / newVisible);

    setItemWidth(w);

    const translate = newStart * (w + GAP);

    setTranslatePx(translate);
  }, [computeVisibleByContainer, suggestedProducts.length]);

  useEffect(() => {
    recompute();
    const ro = new ResizeObserver(recompute);

    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('load', recompute);
    window.addEventListener('resize', recompute);

    return () => {
      ro.disconnect();
      window.removeEventListener('load', recompute);
      window.removeEventListener('resize', recompute);
    };
  }, [recompute]);

  const maxStart = Math.max(0, suggestedProducts.length - visibleCount);
  const prev = () => setStartIndex(i => Math.max(0, i - 1));
  const next = () => setStartIndex(i => Math.min(maxStart, i + 1));

  useEffect(() => {
    const x = startIndex * (itemWidth + GAP);

    setTranslatePx(x);
  }, [startIndex, itemWidth]);

  return (
    <section className={styles.block} aria-label="You may also like">
      <div className={styles.header}>
        <h2 className={styles.title}>You may also like</h2>
        <div className={styles.controls}>
          <button
            className={styles.navBtn}
            onClick={prev}
            aria-label="Previous"
            disabled={startIndex === 0}
          >
            ‹
          </button>
          <button
            className={styles.navBtn}
            onClick={next}
            aria-label="Next"
            disabled={startIndex >= maxStart}
          >
            ›
          </button>
        </div>
      </div>

      <div className={styles.viewport} ref={containerRef}>
        <div
          className={styles.track}
          style={{
            transform: `translateX(-${translatePx}px)`,
          }}
        >
          {suggestedProducts.map(p => (
            <div
              key={p.id}
              className={styles.slideItem}
              style={{ width: itemWidth ? `${itemWidth}px` : undefined }}
            >
              <ProductCard product={p as any} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
