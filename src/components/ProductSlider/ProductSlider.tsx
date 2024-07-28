import style from './ProductSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { ProductContext } from '../../store/ProductProvider';

type ScrollValues = 228 | 261 | 304;

type Props = {
  title: string;
  discount: boolean;
};

const getVisibleProducts = (products: Product[], discount: boolean) => {
  if (!products.length) {
    return;
  }

  if (!discount) {
    let lastYearProduction = products[0].year;

    for (const item of products) {
      if (item.year > lastYearProduction) {
        lastYearProduction = item.year;
      }
    }

    return [...products]
      .filter(item => item.year === lastYearProduction)
      .sort((a, b) => b.fullPrice - a.fullPrice);
  }

  return products
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .filter(item => item.fullPrice - item.price >= 100);
};

export const ProductSlider: React.FC<Props> = ({ title, discount }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollValue, setScrollValue] = useState<ScrollValues>(228);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { products } = useContext(ProductContext);

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

  const visibleList = getVisibleProducts(products, discount);

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
