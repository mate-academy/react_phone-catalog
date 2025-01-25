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
  visibilityRate: number;
};

const findLastInvisibleItem = (
  items: ItemVisibility[],
): [number, ItemVisibility] | void => {
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];

    if (item.visibilityRate) {
      if (item.visibilityRate > 0.99) {
        return [i + 1, items[i + 1]];
      }

      return [i, item];
    }
  }
};

const findPrevInvisibleItem = (
  items: ItemVisibility[],
): [number, ItemVisibility] | void => {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (item.visibilityRate) {
      if (item.visibilityRate > 0.99) {
        return [i - 1, items[i - 1]];
      }

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

            foundItem!.visibilityRate = entry.intersectionRatio;
          }

          return newItemsVisibility;
        });
      },
      { root: sliderRef.current, threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
    );

    const newItemsVisibility: ItemVisibility[] = [];

    itemsRef.current.forEach(item => {
      observer.observe(item);
      newItemsVisibility.push({ item, visibilityRate: 0 });
    });

    setItemsVisibility(newItemsVisibility);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollRight = useCallback(() => {
    setItemsVisibility(prevItems => {
      const lastVisibleItem = findLastInvisibleItem(prevItems);

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

        scrollTo(sliderRef.current, item, false);
      }

      return prevItems;
    });
  }, [scrollTo]);

  const leftArrow =
    itemsVisibility.length !== 0
      ? itemsVisibility[0].visibilityRate >= 0.99
      : true;

  const rightArrow =
    itemsVisibility.length !== 0
      ? itemsVisibility.at(-1)!.visibilityRate >= 0.99
      : true;

  return (
    <section className={styles['products-slider']}>
      <div className={styles['products-slider__header']}>
        <h2>{title}</h2>

        <div className={styles['products-slider__control-buttons']}>
          <div onClick={!leftArrow ? scrollLeft : undefined}>
            <Arrow type={ArrowType.left} disabled={leftArrow} />
          </div>

          <div onClick={!rightArrow ? scrollRight : undefined}>
            <Arrow type={ArrowType.right} disabled={rightArrow} />
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
