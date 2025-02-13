import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './SliderList.module.scss';

import { Product } from '@sTypes/Product';
import { ProductCard } from '@components/ProductCard';
import { ProductCardSkeleton } from '@components/ProductCardSkeleton';

import { getHistoryStateItem } from '@utils/getHistoryStateItem';
import { setHistoryStateItem } from '@utils/setHistoryStateItem';

type Props = {
  onClick: () => void;

  title: string;
  products: Product[];
  itemsRef: React.RefObject<HTMLElement[]>;
  sliderRef: React.RefObject<HTMLDivElement>;

  hidePrevPrice?: boolean;
};

export const SliderList: React.FC<Props> = React.memo(function SliderList({
  onClick = () => {},

  title,
  sliderRef,
  itemsRef,
  products,
  hidePrevPrice,
}) {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  const showSkeletons = products.length === 0;

  const prevOffsetWidth = useRef(0);
  const prevScrollWidth = useRef(0);
  const [slider, setSlider] = useState(sliderRef.current);

  useEffect(() => setSlider(sliderRef.current), [setSlider, sliderRef]);

  useEffect(() => {
    const handleResize = () => {
      if (slider) {
        const offsetWidth = slider.offsetWidth;

        if (offsetWidth === prevOffsetWidth.current) {
          return;
        }

        const scrollWidth = slider.scrollWidth;
        const scrollRatio = slider.scrollLeft / prevScrollWidth.current;

        prevScrollWidth.current = scrollWidth;
        prevOffsetWidth.current = offsetWidth;
        slider.scrollLeft = scrollWidth * scrollRatio;
      }
    };

    const observer = new ResizeObserver(handleResize);

    if (slider) {
      observer.observe(slider);
      prevOffsetWidth.current = slider.offsetWidth;
      prevScrollWidth.current = slider.scrollWidth;
    }

    return () => {
      if (slider) {
        observer.unobserve(slider);
      }
    };
  }, [slider]);

  useEffect(() => {
    const prevPos = getHistoryStateItem<number>(`slider/${title}`);

    if (prevPos || prevPos === 0) {
      setTimeout(() => {
        sliderRef.current?.scrollBy({ left: prevPos, behavior: 'smooth' });
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderRef.current, title]);

  const handleScroll = useCallback(() => {
    if (!sliderRef.current) {
      return;
    }

    setHistoryStateItem(`slider/${title}`, sliderRef.current.scrollLeft);
    onClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClick, sliderRef.current, title]);

  return (
    <div
      ref={sliderRef}
      className={classNames(styles['slider-list'], {
        [styles['slider-list--disabled']]: showSkeletons,
      })}
      onScroll={handleScroll}
    >
      {showSkeletons && skeletons.map(v => <ProductCardSkeleton key={v} />)}

      {!showSkeletons &&
        products.map((product, i) => (
          <ProductCard
            ref={(el: HTMLElement) => {
              if (itemsRef.current !== null) {
                // eslint-disable-next-line no-param-reassign
                itemsRef.current[i] = el;
              }
            }}
            key={product.id}
            product={product}
            hidePrevPrice={hidePrevPrice}
          />
        ))}
    </div>
  );
});
