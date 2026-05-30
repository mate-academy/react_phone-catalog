import React from 'react';
import classNames from 'classnames';

import { Product } from '../../types';
import { usePixelScrollDragSlider } from '../../hooks';

import { ProductCard } from '../ProductCard';
import { ArrowLeftIcon, ArrowRightIcon } from '../icons';

import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
  className?: string;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  className = '',
}) => {
  const {
    wrapperRef,
    listRef,
    itemRef,

    cardWidth,
    currentScroll,
    maxScroll,
    setCurrentScroll,

    isDragging,
    wasDragged,
    dragHandlers,
  } = usePixelScrollDragSlider({});

  const GAP = 16;

  const isPrevDisabled = currentScroll <= 0;
  const isNextDisabled = currentScroll >= maxScroll;

  const scrollNext = () => {
    setCurrentScroll(curr => Math.min(curr + cardWidth + GAP, maxScroll));
  };

  const scrollPrev = () => {
    setCurrentScroll(curr => Math.max(curr - (cardWidth + GAP), 0));
  };

  return (
    <section className={classNames(styles['products-slider'], className)}>
      <div className={styles['products-slider__top']}>
        <h2 className={styles['products-slider__title']}>{title}</h2>
        <div className={styles['products-slider__controls']}>
          <button
            disabled={isPrevDisabled}
            className={classNames(
              styles['products-slider__button'],
              styles['products-slider__button--prev'],
            )}
            onClick={scrollPrev}
          >
            <ArrowLeftIcon />
          </button>
          <button
            disabled={isNextDisabled}
            className={classNames(
              styles['products-slider__button'],
              styles['products-slider__button--next'],
            )}
            onClick={scrollNext}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      <div
        className={classNames(styles['products-slider__viewport'], {
          [styles['products-slider__viewport--dragging']]: isDragging,
        })}
        ref={wrapperRef}
        {...dragHandlers}
      >
        <ul ref={listRef} className={styles['products-slider__list']}>
          {products.map((product, index) => (
            <li
              key={product.itemId}
              className={styles['products-slider__item']}
              ref={index === 0 ? itemRef : null}
            >
              <ProductCard
                product={product}
                draggable={false}
                isClickable={!wasDragged}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
