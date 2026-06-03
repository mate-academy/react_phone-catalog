import React, { useRef, useState } from 'react';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../../types';
import { ProductCardLoading } from '../ProductCard/Loading/ProductCardLoading';

type Props = {
  title: string;
  count: number;
  products: Product[];
  isLoading: boolean;
};

export const ProductsSlider = ({
  title,
  count,
  products,
  isLoading,
}: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    const card = sliderRef.current?.querySelector(
      `.${styles.card}`,
    ) as HTMLElement;
    const cardWidth = card?.offsetWidth + 16;

    sliderRef.current?.scrollBy({
      left: cardWidth * count,
      behavior: 'smooth',
    });
    setCurrentSlide(prev => prev + count);
  };

  const handlePrev = () => {
    const card = sliderRef.current?.querySelector(
      `.${styles.card}`,
    ) as HTMLElement;
    const cardWidth = card?.offsetWidth + 16;

    sliderRef.current?.scrollBy({
      left: -cardWidth * count,
      behavior: 'smooth',
    });
    setCurrentSlide(prev => prev - count);
  };

  return (
    <article className={styles.productsSlider}>
      <header className={styles.header}>
        <p>{title}</p>
        <div className={styles.headerButtons}>
          <button
            disabled={currentSlide === 0}
            className={currentSlide === 0 ? styles.iconDisabled : styles.icon}
            onClick={handlePrev}
          >
            <img src="img/icons/Chevron_(Arrow_Left).svg" alt="" />
          </button>
          <button
            disabled={currentSlide === products.length - 1}
            className={styles.icon}
            onClick={handleNext}
          >
            <img src="img/icons/Chevron_(Arrow_Right).svg" alt="next" />
          </button>
        </div>
      </header>
      <div className={styles.windowSlider} ref={sliderRef}>
        <div className={styles.slider}>
          {isLoading ? (
            <ProductCardLoading count={count} />
          ) : (
            products.map(product => (
              <div key={product.id} className={styles.card}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </article>
  );
};
