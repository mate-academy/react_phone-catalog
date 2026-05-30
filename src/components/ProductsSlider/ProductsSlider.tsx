import React, { useEffect, useRef, useState } from 'react';
import { Products } from '../../types/Types';
import style from './ProductsSlider.module.scss';
import { Icon } from '../ui/Icon/Icon';
import { ProductCard } from '../ProductCard/ProductCard';
import classNames from 'classnames';

type Props = {
  titleLine1: string;
  titleLine2?: string;
  products: Products[];
};

type Direction = 'right' | 'left';

export const ProductsSlider: React.FC<Props> = ({
  titleLine1,
  titleLine2 = '',
  products,
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);
  const MAX_COUNT_VISIBLE = 12;
  const visibleProducts = products.slice(0, MAX_COUNT_VISIBLE);

  const updateScrollButtons = () => {
    if (!listRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = listRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
  };

  const scrollByCard = (direction: Direction) => {
    if (!listRef.current) {
      return;
    }

    const card = listRef.current.children[0] as HTMLElement;

    if (card) {
      const cardWidth = card.offsetWidth;
      const listStyle = window.getComputedStyle(listRef.current);
      const gap = parseInt(listStyle.gap) || 0;
      const scrollAmount = cardWidth + gap;

      listRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const el = listRef.current;

    if (!el) {
      return;
    }

    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons);

    return () => el.removeEventListener('scroll', updateScrollButtons);
  }, [visibleProducts]);

  return (
    <section className={style.slider}>
      <div className={style.slider__header}>
        <h2 className={style.slider__title}>
          {titleLine1} {titleLine2 && <br className={style.slider__breake} />}
          {titleLine2}
        </h2>
        <div className={style.slider__buttons}>
          <button
            className={style.slider__button}
            onClick={() => scrollByCard('left')}
            disabled={!canScrollLeft}
          >
            <Icon
              className={classNames(style.slider__arrow, {
                [style['slider__arrow--disabled']]: !canScrollLeft,
              })}
              nameIcon="left"
            />
          </button>
          <button
            className={style.slider__button}
            onClick={() => scrollByCard('right')}
            disabled={!canScrollRight}
          >
            <Icon
              className={classNames(style.slider__arrow, {
                [style['slider__arrow--disabled']]: !canScrollRight,
              })}
              nameIcon="right"
            />
          </button>
        </div>
      </div>

      <div className={style.slider__listContainer}>
        <div ref={listRef} className={style.slider__productsList}>
          {visibleProducts.map((product, index) => (
            <div key={index} className={style.slider__cardContainer}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
