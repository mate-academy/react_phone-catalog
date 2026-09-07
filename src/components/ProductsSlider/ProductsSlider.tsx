/* eslint-disable max-len */
import React from 'react';
import styles from './ProductsSlider.module.scss';
import buttonDefaultRight from '../../../public/img/assets/icons/sliderButtonDefaultRight.png';
import { ProductCard } from '../ProductCard';

export const ProductsSlider: React.FC = () => {
  return (
    <section className={styles.productSlider}>
      <div className={styles.productSlider__container}>
        <div className={styles.productSlider__header}>
          <h2 className={styles.productSlider__title}>Brand new models</h2>

          <div className={styles.productSlider__controls}>
            <button className={styles.productSlider__button}>
              <img
                className={styles.productSlider__arrowLeft}
                src={buttonDefaultRight}
                alt="Prev button"
              />
            </button>
            <button className={styles.productSlider__button}>
              <img
                className={styles.productSlider__arrowRight}
                src={buttonDefaultRight}
                alt="Next button"
              />
            </button>
          </div>
        </div>

        <div className={styles.productSlider__slider}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </section>
  );
};
