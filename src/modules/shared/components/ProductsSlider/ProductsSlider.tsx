import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from './ProductsSlider.module.scss';

import { Product } from '@sTypes/Product';
import { ArrowType } from '@sTypes/ArrowType';

import { Arrow } from '@components/Arrow';
import { SliderList } from '@components/SliderList';

import { useScrollAnimation } from '@hooks/useScrollAnimation';

type Props = {
  title: string;
  products: Product[];
  hidePrevPrice?: boolean;
};

type ItemVisibility = {
  item: HTMLElement;
  isVisible: boolean;
};

const findLastVisibleItem = (
  items: ItemVisibility[],
): [number, ItemVisibility] | void => {
  let found = false;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (!found) {
      if (item.isVisible) {
        found = true;
      }
    } else if (!item.isVisible) {
      return [i, item];
    }
  }
};

const findPrevInvisibleItem = (
  items: ItemVisibility[],
): [number, ItemVisibility] | void => {
  let found = false;

  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];

    if (!found) {
      if (item.isVisible) {
        found = true;
      }
    } else if (!item.isVisible) {
      return [i, item];
    }
  }
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  hidePrevPrice,
}) => {
  const itemsRef = useRef<HTMLElement[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollTo = useScrollAnimation(300);
  const [itemsVisibility, setItemsVisibility] = useState<ItemVisibility[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      newEntries => {
        setItemsVisibility(prevItems => {
          const newItemsVisibility = [...prevItems];

          for (const entry of newEntries) {
            const target = entry.target;

            const foundItem = newItemsVisibility.find(
              item => item.item === target,
            );

            foundItem!.isVisible = entry.isIntersecting;
          }

          return newItemsVisibility;
        });
      },
      { root: sliderRef.current, threshold: 1 },
    );

    const newItemsVisibility: ItemVisibility[] = [];

    itemsRef.current.forEach(item => {
      observer.observe(item);
      newItemsVisibility.push({ item, isVisible: false });
    });

    setItemsVisibility(newItemsVisibility);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollRight = useCallback(() => {
    setItemsVisibility(prevItems => {
      const lastVisibleItem = findLastVisibleItem(prevItems);

      if (lastVisibleItem && sliderRef.current) {
        const item = prevItems[lastVisibleItem[0]].item;

        scrollTo(sliderRef.current, item);
      }

      return prevItems;
    });
  }, [scrollTo]);

  const scrollLeft = useCallback(() => {
    setItemsVisibility(prevItems => {
      const lastVisibleItem = findPrevInvisibleItem(prevItems);

      if (lastVisibleItem && sliderRef.current) {
        const item = prevItems[lastVisibleItem[0]].item;

        scrollTo(sliderRef.current, item);
      }

      return prevItems;
    });
  }, [scrollTo]);

  return (
    <section className={styles['products-slider']}>
      <div className={styles['products-slider__header']}>
        <h2>{title}</h2>

        <div className={styles['products-slider__control-buttons']}>
          <div onClick={scrollLeft}>
            <Arrow
              type={ArrowType.left}
              disabled={
                itemsVisibility.length !== 0
                  ? itemsVisibility[0].isVisible
                  : true
              }
            />
          </div>

          <div onClick={scrollRight}>
            <Arrow
              type={ArrowType.right}
              disabled={
                itemsVisibility.length !== 0
                  ? itemsVisibility.at(-1)!.isVisible
                  : true
              }
            />
          </div>
        </div>
      </div>

      <SliderList
        sliderRef={sliderRef}
        itemsRef={itemsRef}
        products={products}
        hidePrevPrice={hidePrevPrice}
      />
    </section>
  );
};
