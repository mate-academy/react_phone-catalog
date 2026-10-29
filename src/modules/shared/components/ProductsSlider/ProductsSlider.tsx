import React, { useRef } from 'react';
import { Product } from '../../../../types';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

type Props = {
  products: Product[];
  title: string;
  showDiscount?: boolean;
};

const GAP = 16;

export const ProductsSlider = ({
  products,
  title,
  showDiscount = true,
}: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (way: number) => {
    const track = trackRef.current;
    const cardWidth = track?.firstElementChild?.clientWidth ?? 0;

    track?.scrollBy({ left: way * (cardWidth + GAP), behavior: 'smooth' });
  };

  return (
    <div className={styles.slider}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.button}
            onClick={() => scroll(-1)}
          >
            <img src="icons/arrow-left.svg" alt="Previous" />
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => scroll(1)}
          >
            <img src="icons/arrow-right.svg" alt="Next" />
          </button>
        </div>
      </div>
      <div className={styles.track} ref={trackRef}>
        {products.map(product => {
          return (
            <div className={styles.item} key={product.id}>
              <ProductCard product={product} showDiscount={showDiscount} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
