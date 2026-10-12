import { useEffect, useRef, useState } from 'react';

import ArrowUp from '@/assets/icons/arrow-up.svg?react';
import { ProductCard } from '@/shared/components';
import { CircleButton } from '@/shared/components/ui';
import { Product } from '@/shared/types';

import styles from './ScrollLineCards.module.scss';

interface Props {
  title: string;
  data: Product[];
  discountProducts?: boolean;
}

export const ScrollLineCards = ({
  title,
  data,
  discountProducts = false,
}: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const updateScrollState = () => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    setIsAtStart(container.scrollLeft <= 0);
    setIsAtEnd(
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 2,
    );
  };

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    updateScrollState();
    container.addEventListener('scroll', updateScrollState);

    return () => container.removeEventListener('scroll', updateScrollState);
  }, []);

  const scroll = (direction: 'prev' | 'next') => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    const card = container.querySelector<HTMLAnchorElement>(`a`);

    if (!card) {
      return;
    }

    const gap = parseFloat(getComputedStyle(container).gap || '0');
    const scrollAmount = card.clientWidth + gap;

    container.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.header__title}>{title}</h2>
        <div className={styles.header__buttons}>
          <CircleButton
            className={`${styles.arrowButton} ${styles.button__prev}`}
            onClick={() => scroll('prev')}
            disabled={isAtStart}
            aria-label="Previous"
          >
            <ArrowUp />
          </CircleButton>
          <CircleButton
            className={`${styles.arrowButton} ${styles.button__next}`}
            onClick={() => scroll('next')}
            disabled={isAtEnd}
            aria-label="Next"
          >
            <ArrowUp />
          </CircleButton>
        </div>
      </div>

      <div className={styles.cardsViewport}>
        <div className={styles.cards} ref={scrollRef}>
          {data.map(item => (
            <ProductCard
              key={item.id}
              product={item}
              withDiscount={discountProducts}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
