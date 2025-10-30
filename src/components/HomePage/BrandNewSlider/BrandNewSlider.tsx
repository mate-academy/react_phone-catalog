import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import styles from './BrandNewSlider.module.scss';
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

function getNewnessScore(p: RawProduct): number {
  if (typeof p.year === 'number' && !Number.isNaN(p.year)) {
    return p.year;
  }

  const text = `${p.namespaceId ?? ''} ${p.name ?? ''}`.toLowerCase();
  const match = text.match(/(\b20\d{2}\b)|(\b\d{2}\b)/);

  if (match) {
    const n = Number(match[0]);

    if (!Number.isNaN(n)) {
      return n < 100 ? 2000 + n : n;
    }
  }

  if (p.releaseDate) {
    const t = Date.parse(p.releaseDate);

    if (!Number.isNaN(t)) {
      return Math.round(t / 1000);
    }
  }

  if (p.priceRegular) {
    return Math.round(p.priceRegular / 10);
  }

  return 0;
}

export function BrandNewSlider() {
  const products = phonesData as unknown as RawProduct[];

  const uniqueByNamespace = useMemo(() => {
    const map = new Map<string, RawProduct>();

    for (const p of products) {
      const key = p.namespaceId ?? p.id;
      const existing = map.get(key);

      if (!existing) {
        map.set(key, p);
      } else {
        if (getNewnessScore(p) > getNewnessScore(existing)) {
          map.set(key, p);
        }
      }
    }

    const arr = Array.from(map.values());
    arr.sort((a, b) => getNewnessScore(b) - getNewnessScore(a));
    return arr;
  }, [products]);

  const GAP = 16; // px gap between slides
  const MIN_CARD = 272; // design min, used for thresholds

  const containerRef = useRef<HTMLDivElement | null>(null);
  const startIndexRef = useRef(0);

  const [startIndex, setStartIndex] = useState(0);
  useEffect(() => {
    startIndexRef.current = startIndex;
  }, [startIndex]);

  const [visibleCount, setVisibleCount] = useState(4);
  const [itemWidth, setItemWidth] = useState(0);
  const [translatePx, setTranslatePx] = useState(0);

  // Decide visible count by container width, but FORCE 4 when window.innerWidth >= 1200
  const computeVisibleByContainer = useCallback((containerWidth: number) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1200) {
      return 4;
    }

    const min4 = 4 * MIN_CARD + 3 * GAP; // 1136
    const min3 = 3 * MIN_CARD + 2 * GAP; // 848
    const min2 = 2 * MIN_CARD + 1 * GAP; // 560

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

    const maxStart = Math.max(0, uniqueByNamespace.length - newVisible);
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
  }, [computeVisibleByContainer, uniqueByNamespace.length]);

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

  const maxStart = Math.max(0, uniqueByNamespace.length - visibleCount);
  const prev = () => setStartIndex(i => Math.max(0, i - 1));
  const next = () => setStartIndex(i => Math.min(maxStart, i + 1));

  // keep translate in sync when startIndex or itemWidth changes
  useEffect(() => {
    const x = startIndex * (itemWidth + GAP);
    setTranslatePx(x);
  }, [startIndex, itemWidth]);

  return (
    <section className={styles.block} aria-label="Brand new models">
      <div className={styles.header}>
        <h2 className={styles.title}>Brand new models</h2>
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
          {uniqueByNamespace.map(p => (
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
