import React, { useContext, useMemo, useState } from 'react';
import cn from 'classnames';

import { ProductsCart } from '../ProductsCart';
import { Products } from '../../types/products';
import { Sort } from '../../types/sort';

import style from './ProductsSlider.module.scss';
import { ThemeContext } from '../../provider/ThemeContextProvider';

function shuffle<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function getSuggestedProducts(productList: Products[], sort?: Sort) {
  const list = [...productList];

  switch (sort) {
    case 'random':
      return shuffle(list);

    case 'price':
      return list.sort((a, b) => b.fullPrice - a.fullPrice);

    case 'year':
      return list.sort((a, b) => b.year - a.year);

    default:
      return list;
  }
}

const SLIDE_WIDTH = 100;
const GAP = 16;

type Props = {
  title: string;
  productList: Products[];
  modifier?: string;
  sort?: Sort;
  discount?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  productList,
  modifier,
  sort,
  discount,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useContext(ThemeContext);

  const visibleList = useMemo(
    () => getSuggestedProducts(productList, sort),
    [productList, sort],
  );

  const maxIndex = visibleList.length - 1;

  const handleNext = () => {
    setCurrentIndex(i => Math.min(i + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex(i => Math.max(i - 1, 0));
  };

  return (
    <section className={style['products-List']}>
      <div className={style['products-List__title']}>
        <h3 className={style['products-List__title__text']}>{title}</h3>
        <div className={style['products-List__buttons']}>
          <button
            className={cn(style['products-List__button'], {
              [style[`products-List__button--back-${theme}`]]: theme,
              [style['products-List__button--disabled']]: currentIndex <= 0,
            })}
            onClick={handlePrev}
          ></button>

          <button
            className={cn(style['products-List__button'], {
              [style[`products-List__button--next-${theme}`]]: theme,
            })}
            onClick={handleNext}
          ></button>
        </div>
      </div>
      <article
        className={style['products-carts']}
        style={{
          transform: `translateX(calc(-${currentIndex * SLIDE_WIDTH}% - ${
            currentIndex * GAP
          }px))`,
        }}
      >
        {visibleList.map(product => (
          <ProductsCart
            key={product.id}
            product={product}
            modifier={modifier}
            discount={discount}
          />
        ))}
      </article>
    </section>
  );
};
