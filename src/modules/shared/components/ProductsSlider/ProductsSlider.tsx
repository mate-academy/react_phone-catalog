import { useEffect, useRef, useState } from 'react';

import type { Product } from '../../types/product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

const PREV_PATH = 'M11 2L5 8l6 6';
const NEXT_PATH = 'M5 2l6 6-6 6';

const ITEM_GAP = 16;

type Props = {
  title: string;
  titleId: string;
  products: Product[];
  showFullPrice?: boolean;
  onProductSelect?: () => void;
  shiftTrackDesktopPx?: number;
};

export const ProductsSlider = ({
  title,
  titleId,
  products,
  showFullPrice = true,
  onProductSelect,
  shiftTrackDesktopPx = 0,
}: Props) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateControls = () => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const tolerance = 1;

    setCanScrollLeft(track.scrollLeft > tolerance);
    setCanScrollRight(track.scrollLeft < maxScrollLeft - tolerance);
  };

  useEffect(() => {
    updateControls();

    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.addEventListener('scroll', updateControls);
    window.addEventListener('resize', updateControls);

    return () => {
      track.removeEventListener('scroll', updateControls);
      window.removeEventListener('resize', updateControls);
    };
  }, [products.length]);

  const scroll = (dir: 1 | -1) => {
    const firstItem = trackRef.current
      ?.firstElementChild as HTMLLIElement | null;
    const itemWidth = firstItem?.getBoundingClientRect().width ?? 272;
    const scrollStep = itemWidth + ITEM_GAP;

    trackRef.current?.scrollBy({
      left: dir * scrollStep,
      behavior: 'smooth',
    });

    setTimeout(updateControls, 350);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>

        <div className={styles.controls}>
          <button
            type="button"
            className={
              canScrollLeft
                ? styles.ctrlBtn
                : `${styles.ctrlBtn} ${styles.ctrlBtnDisabled}`
            }
            aria-label="Scroll left"
            disabled={!canScrollLeft}
            onClick={() => scroll(-1)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d={PREV_PATH}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className={
              canScrollRight
                ? styles.ctrlBtn
                : `${styles.ctrlBtn} ${styles.ctrlBtnDisabled}`
            }
            aria-label="Scroll right"
            disabled={!canScrollRight}
            onClick={() => scroll(1)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d={NEXT_PATH}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <ul
        className={styles.track}
        ref={trackRef}
        style={
          shiftTrackDesktopPx > 0
            ? { '--desktop-track-shift': `${shiftTrackDesktopPx}px` }
            : undefined
        }
      >
        {products.map(product => (
          <li key={product.id} className={styles.item}>
            <ProductCard
              product={product}
              showFullPrice={showFullPrice}
              onOpen={onProductSelect}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
