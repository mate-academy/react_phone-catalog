import React, { useRef } from 'react';
import styles from './ProductSlider.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductInfo } from '../../Utills/types';

type Props = {
  data: ProductInfo[];
  hasDiscount: boolean;
  title: string;
};

export const ProductSlider: React.FC<Props> = ({
  data,
  hasDiscount,
  title,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    const el = sliderRef.current as HTMLElement | null;

    if (!el) {
      return;
    }

    const firstChild = el.firstElementChild as HTMLElement | null;
    const gap = 16; // must match CSS gap
    const step = firstChild
      ? Math.round(firstChild.getBoundingClientRect().width + gap)
      : 300;

    el.scrollBy({ left: -step, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const el = sliderRef.current as HTMLElement | null;

    if (!el) {
      return;
    }

    const firstChild = el.firstElementChild as HTMLElement | null;
    const gap = 16;
    const step = firstChild
      ? Math.round(firstChild.getBoundingClientRect().width + gap)
      : 300;

    el.scrollBy({ left: step, behavior: 'smooth' });
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.button__container}>
          <button className={styles.button__left} onClick={scrollLeft}></button>

          <button
            className={styles.button__rigth}
            onClick={scrollRight}
          ></button>
        </div>
      </div>

      <div className={styles.slider}>
        <div className={styles.cards} ref={sliderRef}>
          {data?.map(product => (
            <ProductCard
              product={product}
              hasDiscount={hasDiscount}
              key={product.itemId}
            />
          ))}
        </div>
      </div>
    </>
  );
};
