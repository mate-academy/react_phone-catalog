/* eslint-disable max-len */
import { useEffect, useRef, useState } from 'react';

import arrowLeftIcon from '../../assets/icons/arrow-left.svg';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
};

const CARD_WIDTH = 288;

export const ProductsSlider = ({ title, products }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateButtons = () => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = slider;

    setCanScrollLeft(scrollLeft > 1);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const slider = sliderRef.current;

    updateButtons();

    slider?.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);

    return () => {
      slider?.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
    };
  }, [products]);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -CARD_WIDTH,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: CARD_WIDTH,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.sliderSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.button}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Previous products"
          >
            <img src={arrowLeftIcon} alt="" className={styles.arrowIcon} />
          </button>

          <button
            type="button"
            className={styles.button}
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Next products"
          >
            <img
              src={arrowLeftIcon}
              alt=""
              className={`${styles.arrowIcon} ${styles.arrowIconRight}`}
            />
          </button>
        </div>
      </div>

      <div ref={sliderRef} className={styles.slider}>
        {products.map(product => (
          <div key={product.itemId} className={styles.card}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
