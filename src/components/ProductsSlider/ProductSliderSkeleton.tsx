import React from 'react';
import classNames from 'classnames';

import { ArrowLeftIcon, ArrowRightIcon } from '../icons';
import { ProductCardSkeleton } from '../ProductCard';

import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  className?: string;
};

export const ProductsSliderSkeleton: React.FC<Props> = ({
  title,
  className = '',
}) => {
  return (
    <section
      className={classNames(
        styles['products-slider'],
        styles['products-slider--loading'],
        className,
      )}
    >
      <div className={styles['products-slider__top']}>
        <h2 className={styles['products-slider__title']}>{title}</h2>
        <div className={styles['products-slider__controls']}>
          <div
            className={classNames(
              styles['products-slider__button'],
              styles['products-slider__button--loading'],
            )}
          >
            <ArrowLeftIcon />
          </div>
          <div
            className={classNames(
              styles['products-slider__button'],
              styles['products-slider__button--loading'],
            )}
          >
            <ArrowRightIcon />
          </div>
        </div>
      </div>

      <div
        className={classNames(
          styles['products-slider__viewport'],
          styles['products-slider__viewport--loading'],
        )}
      >
        <ul className={styles['products-slider__list']}>
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className={styles['products-slider__item']}>
              <ProductCardSkeleton />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
