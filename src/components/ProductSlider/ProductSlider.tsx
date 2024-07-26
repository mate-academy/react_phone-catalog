import style from './ProductSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

type ScrollValues = 228 | 261 | 304;

type Props = {
  title: string;
  discount: boolean;
};

export const ProductSlider: React.FC<Props> = ({ title, discount }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollValue, setScrollValue] = useState<ScrollValues>(228);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
        <ProductCard discount={discount} />
        <ProductCard discount={discount} />
        <ProductCard discount={discount} />
        <ProductCard discount={discount} />
        <ProductCard discount={discount} />
        <ProductCard discount={discount} />
      </div>
    </section>
  );
};
