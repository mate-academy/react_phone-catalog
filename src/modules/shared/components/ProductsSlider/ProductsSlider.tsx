import React, { useState } from 'react';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../../types';

type Props = {
  title: string;
  count: number;
  products: Product[];
};

export const ProductsSlider = ({ title, count, products }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <article className={styles.productsSlider}>
      <header className={styles.header}>
        <p>{title}</p>
        <div className={styles.headerButtons}>
          <button
            disabled={currentSlide === 0}
            className={currentSlide === 0 ? styles.iconDisabled : styles.icon}
            onClick={() =>
              setCurrentSlide(
                currentSlide === 0 ? products.length - 1 : currentSlide - 1,
              )
            }
          >
            <img src="/img/icons/Chevron_(Arrow_Left).svg" alt="" />
          </button>
          <button
            disabled={currentSlide === products.length - 1}
            className={styles.icon}
            onClick={() =>
              setCurrentSlide(
                currentSlide === products.length - 1 ? 0 : currentSlide + 1,
              )
            }
          >
            <img src="/img/icons/Chevron_(Arrow_Right).svg" alt="next" />
          </button>
        </div>
      </header>
      <div className={styles.windowSlider}>
        <div className={styles.slider}>
          {products.slice(currentSlide, currentSlide + count).map(product => (
            <div key={product.id} className={styles.card}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
