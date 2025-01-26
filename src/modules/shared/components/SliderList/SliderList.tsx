import React from 'react';
import classNames from 'classnames';

import styles from './SliderList.module.scss';

import { Product } from '@sTypes/Product';
import { ProductCard } from '@components/ProductCard';
import { ProductCardSkeleton } from '@components/ProductCardSkeleton';

type Props = {
  products: Product[];
  itemsRef: React.RefObject<HTMLElement[]>;
  sliderRef: React.RefObject<HTMLDivElement>;

  hidePrevPrice?: boolean;
};

export const SliderList: React.FC<Props> = React.memo(function SliderList({
  sliderRef,
  itemsRef,
  products,
  hidePrevPrice,
}) {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  const showSkeletons = products.length === 0;

  return (
    <div
      ref={sliderRef}
      className={classNames(styles['slider-list'], {
        [styles['slider-list--disabled']]: showSkeletons,
      })}
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
