import { useCallback, useEffect, useRef, useState } from 'react';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
};

const cardsGap = 16;

const iconSrc = (iconName: string) => {
  return `${import.meta.env.BASE_URL}img/icons/${iconName}`;
};

export const ProductsSlider = ({ title, products }: Props) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  const updateButtons = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;

    setCanScrollBack(viewport.scrollLeft > 1);
    setCanScrollForward(viewport.scrollLeft < maxScrollLeft - 1);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return undefined;
    }

    viewport.scrollLeft = 0;
    updateButtons();

    const handleResize = () => updateButtons();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [products, updateButtons]);

  const scrollCards = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    const firstCard = viewport?.querySelector<HTMLElement>('[data-slide]');

    if (!viewport || !firstCard) {
      return;
    }

    viewport.scrollBy({
      left: direction * (firstCard.offsetWidth + cardsGap),
      behavior: 'smooth',
    });
  };

  if (!products.length) {
    return null;
  }

  return (
    <section className={styles.slider} aria-label={title}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.button}
            aria-label={`Show previous ${title.toLowerCase()}`}
            disabled={!canScrollBack}
            onClick={() => scrollCards(-1)}
          >
            <img
              src={iconSrc('chevron-arrow-left.svg')}
              alt=""
              className={styles.buttonIcon}
            />
          </button>

          <button
            type="button"
            className={styles.button}
            aria-label={`Show next ${title.toLowerCase()}`}
            disabled={!canScrollForward}
            onClick={() => scrollCards(1)}
          >
            <img
              src={iconSrc('chevron-arrow-right.svg')}
              alt=""
              className={styles.buttonIcon}
            />
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={styles.viewport}
        onScroll={updateButtons}
      >
        <div className={styles.track} role="list">
          {products.map(product => (
            <div
              key={product.id}
              className={styles.slide}
              data-slide
              role="listitem"
            >
              <ProductCard product={product} className={styles.card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
