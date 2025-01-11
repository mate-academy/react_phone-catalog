import React, { useRef } from 'react';
import styles from './CardSlider.module.scss';
import classNames from 'classnames';

import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

const SCROLL_OFFSET = 300;

interface Props {
  sliderTitle: string;
  products: Product[];
  showDiscount?: boolean;
}

export const CardSlider: React.FC<Props> = ({
  sliderTitle,
  products,
  showDiscount,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -SCROLL_OFFSET, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: SCROLL_OFFSET, behavior: 'smooth' });
  };

  return (
    <section className={classNames(styles['card-slider'])}>
      <div className={styles['card-slider__header']}>
        <h2 className={styles['card-slider__title']}>{sliderTitle}</h2>
        <div className={styles['card-slider__buttons']}>
          <button
            className={classNames(
              styles['card-slider__button'],
              styles.button,
              styles['card-slider__button--left'],
            )}
            onClick={scrollLeft}
          >
            <img
              src="public/Images/Arrow-right.svg"
              alt="Left"
              className={styles['card-slider__button-img']}
            />
          </button>
          <button
            className={classNames(
              styles['card-slider__button'],
              styles.button,
              styles['card-slider__button--right'],
            )}
            onClick={scrollRight}
          >
            <img
              src="public/Images/Arrow-right.svg"
              alt="Right"
              className={styles['card-slider__button-img']}
            />
          </button>
        </div>
      </div>
      <div ref={sliderRef} className={styles['card-slider__products']}>
        {products.map(product => (
          <ProductCard
            product={product}
            showDiscount={showDiscount}
            key={product.id}
          />
        ))}
      </div>
    </section>
  );
};
