import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ProductCarousel.module.scss';

import { ProductCard } from '../ProductCard';

import ArrowLeft from '../../assets/Icons/Arrow_left.svg';
import ArrowRight from '../../assets/Icons/Arrow_right.svg';

export interface Product {
  id: string | number;
  itemId?: string;
  name: string;

  // Старі поля (з якими ти працював раніше)
  price?: number;
  fullPrice?: number;
  image?: string;
  category?: string;

  // Нові поля (з якими ти працюєш зараз)
  priceDiscount?: number;
  priceRegular?: number;
  images?: string[];
  amount?: number;

  // Спільні поля
  screen: string;
  capacity: string;
  capacityAvailable?: string[]; // Додано для списку доступних обсягів пам'яті
  color: string;
  colorsAvailable?: string[]; // Додано для списку доступних кольорів
  ram: string;
  year: string;
}

type Props = {
  products: Product[];
  title: string;
  discount?: boolean;
};

const useVisibleCount = () => {
  const [count, setCount] = useState(4);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      if (w < 640) {
        setCount(1);
      } else if (w < 1024) {
        setCount(2);
      } else {
        setCount(4);
      }
    };

    update();
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
};

export const ProductCarousel = ({ products, title, discount }: Props) => {
  const [index, setIndex] = useState(0);
  const visibleCount = useVisibleCount();
  const maxIndex = Math.max(0, products.length - visibleCount);
  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);

  const prev = useCallback(
    () => setIndex(i => Math.max(0, i - visibleCount)),
    [visibleCount],
  );

  const next = useCallback(
    () => setIndex(i => Math.min(maxIndex, i + visibleCount)),
    [maxIndex, visibleCount],
  );

  useEffect(() => {
    setIndex(i => Math.min(i, maxIndex));
  }, [maxIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startXRef.current === null) {
      return;
    }

    const dx = startXRef.current - e.changedTouches[0].clientX;

    if (Math.abs(dx) > 40) {
      if (dx > 0) {
        next();
      } else {
        prev();
      }
    }

    startXRef.current = null;
  };

  const hasPeek = visibleCount < 4;
  const PEEK = hasPeek ? 48 : 0;
  const GAP = 16;

  const cardWidth = hasPeek
    ? `calc((100% - ${PEEK}px - ${GAP * visibleCount}px) / ${visibleCount})`
    : `calc((100% - ${GAP * (visibleCount - 1)}px) / ${visibleCount})`;

  const translateX =
    index > 0 ? `calc(-${index} * (${cardWidth} + ${GAP}px))` : '0px';

  // ✅ КРОК 2: Вираховуємо загальну кількість "сторінок" для крапок
  // const totalPages = Math.ceil(products.length / visibleCount);

  return (
    <>
      <style>{`
        .${styles['carousel-track']} {
          width: 100% !important;
        }
        .${styles['carousel-track']} > * {
          flex: 0 0 ${cardWidth} !important;
          min-width: 0;
        }
      `}</style>

      <section className={styles['carousel-section']}>
        <div className={styles['carousel-header']}>
          <h2 className={styles['carousel-title']}>{title}</h2>
          <div className={styles['carousel-nav']}>
            <button
              className={styles['nav-btn']}
              onClick={prev}
              disabled={index === 0}
              aria-label="Previous"
            >
              <img
                src={ArrowLeft}
                alt="arrow_left"
                style={{ filter: 'brightness(0)' }}
              />
            </button>
            <button
              className={styles['nav-btn']}
              onClick={next}
              disabled={index >= maxIndex}
              aria-label="Next"
            >
              <img
                src={ArrowRight}
                alt="arrow_left"
                style={{ filter: 'brightness(0)' }}
              />
            </button>
          </div>
        </div>

        <div className={styles['carousel-outer']}>
          <div
            className={styles['carousel-viewport']}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={styles['carousel-track']}
              ref={trackRef}
              style={{ transform: `translateX(${translateX})` }}
            >
              {products.map(p => (
                <ProductCard key={p.id} product={p} discount={discount} />
              ))}
            </div>
          </div>
        </div>

        {/* <div className={styles['carousel-dots']}>
          {Array.from({ length: totalPages }).map((_, i) => {
            // Визначаємо, яка сторінка зараз активна
            const isActive = i === Math.ceil(index / visibleCount);

            return (
              <button
                key={i}
                className={`${styles['dot']} ${isActive ? styles['active'] : ''}`}
                // При кліку множимо індекс крапки на кількість карток, але не більше maxIndex
                onClick={() => setIndex(Math.min(i * visibleCount, maxIndex))}
                aria-label={`Go to slide page ${i + 1}`}
              />
            );
          })}
        </div> */}
      </section>
    </>
  );
};
