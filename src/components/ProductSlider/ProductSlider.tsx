import style from './ProductSlider.module.scss';
import { ProductCard } from '../ProductCard';
import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { ProductContext } from '../../store/ProductProvider';
import { getVisibleProducts } from '../../utils/getVisibleProducts';
import { Product } from '../../types/Product';

type ScrollValues = 228 | 261 | 304;

type Props = {
  title: string;
  discount: boolean;
  random: boolean;
};

export const ProductSlider: React.FC<Props> = ({ title, discount, random }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollValue, setScrollValue] = useState<ScrollValues>(228);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { products } = useContext(ProductContext);

  const [visibleList, setVisibleList] = useState<Product[]>([]);

  useEffect(() => {
    const newList = getVisibleProducts(products, discount, random);

    setVisibleList(newList);
  }, [discount, products, random]);

  useEffect(() => {
    const getScrollValue = () => {
      if (window.innerWidth > 639) {
        setScrollValue(261);
      }

      if (window.innerWidth > 1200) {
        setScrollValue(304);
      }
    };

    getScrollValue();
    window.addEventListener('resize', getScrollValue);

    return () => window.removeEventListener('resize', getScrollValue);
  }, []);

  useEffect(() => {
    const currentRef = scrollRef.current;
    const updateScrollArrows = () => {
      if (currentRef) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
      }
    };

    updateScrollArrows();
    if (currentRef) {
      currentRef.addEventListener('scroll', updateScrollArrows);
    }

    return () => currentRef?.removeEventListener('scroll', updateScrollArrows);
  }, []);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollValue });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollValue });
    }
  };

  return (
    <section className={style.productSlider}>
      <div className={style.productSlider__header}>
        <h2 className={style.title}>{title}</h2>
        <div className={style.arrows}>
          <div
            className={cn(style.arrows__left, {
              [style['arrows__left--active']]: canScrollLeft,
            })}
            onClick={scrollLeft}
          />
          <div
            className={cn(style.arrows__right, {
              [style['arrows__right--active']]: canScrollRight,
            })}
            onClick={scrollRight}
          />
        </div>
      </div>
      <div className={style.productCard} ref={scrollRef}>
        {visibleList?.map(prod => (
          <ProductCard key={prod.id} prod={prod} discount={discount} />
        ))}
      </div>
    </section>
  );
};
