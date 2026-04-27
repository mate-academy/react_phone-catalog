import React, { useRef } from 'react';
import styles from './CardCarousel.module.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
type Props = {
  products: Product[];
  title: string;
  fullPrice: boolean;
};

export const CardCarousel: React.FC<Props> = ({
  products,
  title,
  fullPrice,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    const card = sliderRef.current?.firstElementChild as HTMLElement;
    const cardWidth = card?.offsetWidth + 16;

    sliderRef.current?.scrollBy({
      left: -cardWidth,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    const card = sliderRef.current?.firstElementChild as HTMLElement;
    const cardWidth = card?.offsetWidth + 16;

    sliderRef.current?.scrollBy({
      left: cardWidth,
      behavior: 'smooth',
    });
  };

  let vieProduct = [...products];

  if (title === 'You may also like') {
    vieProduct = [...products].sort(() => Math.random() - 0.5).slice(0, 30);
  }

  return (
    <section className={styles.sliderSection}>
      <div className={styles.header}>
        <h2 className={styles.titleh2}>{title}</h2>

        <div className={styles.buttons}>
          <button onClick={scrollLeft} className={styles.naxigatearrow}>
            <img src="./img/icons/arrowLeft.svg" alt="ArrowLeft" />
          </button>
          <button onClick={scrollRight} className={styles.naxigatearrow}>
            <img src="./img/icons/arrowRight.svg" alt="ArrowRight" />
          </button>
        </div>
      </div>

      <div className={styles.slider} ref={sliderRef}>
        {vieProduct.map(product => (
          <ProductCard key={product.id} product={product} turnon={fullPrice} />
        ))}
      </div>
    </section>
  );
};
