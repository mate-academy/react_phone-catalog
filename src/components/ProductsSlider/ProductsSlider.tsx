import { useEffect, useRef, useState } from 'react';
import { ProductCard } from '../ProductCard';
import type { Product } from '../../types/Product';
import styles from './ProductsSlider.module.scss';

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
  const trackRef = useRef<HTMLDivElement>(null);
  const [arrows, setArrows] = useState({ prev: false, next: true });

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const updateArrows = () => {
      setArrows({
        prev: track.scrollLeft > 0,
        next: track.scrollLeft + track.clientWidth < track.scrollWidth - 1,
      });
    };

    updateArrows();

    track.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);

    return () => {
      track.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [products]);

  const scrollByCard = (direction: number) => {
    const track = trackRef.current;
    const card = track?.firstElementChild;

    if (!track || !card) {
      return;
    }

    track.scrollBy({
      left: direction * (card.clientWidth + 16),
      behavior: 'smooth',
    });
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Previous products"
            disabled={!arrows.prev}
            onClick={() => scrollByCard(-1)}
          >
            <img src="img/icons/arrow-left.svg" alt="" width="16" height="16" />
          </button>

          <button
            type="button"
            className={styles.arrow}
            aria-label="Next products"
            disabled={!arrows.next}
            onClick={() => scrollByCard(1)}
          >
            <img
              src="img/icons/arrow-right.svg"
              alt=""
              width="16"
              height="16"
            />
          </button>
        </div>
      </div>

      <div className={styles.track} ref={trackRef}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            showDiscount={showDiscount}
          />
        ))}
      </div>
    </section>
  );
};
