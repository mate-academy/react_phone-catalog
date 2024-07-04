/* eslint-disable @typescript-eslint/indent */
import React, { ComponentPropsWithoutRef, FC, useMemo } from 'react';
import cn from 'classnames';

import {
  fetchProducts,
  selectHotPrices,
} from '../../../../app/features/products';
import { useFetchedData } from '../../../../hooks/useFetchedData';
import { ProductCard } from '../../../shared/ProductCard';
import { HorizontalCarousel } from '../../../shared/HorizontalCarousel';
import { Text } from '../../../shared/ui/Text';
import classes from './hotPricesCarousel.module.scss';

type Props = ComponentPropsWithoutRef<'div'>;

const skeletons = Array.from(Array(4), (_, i) => (
  <ProductCard.Skeleton key={i} />
));

export const HotPricesCarousel: FC<Props> = ({ className, ...props }) => {
  const { products, status } = useFetchedData(fetchProducts(), selectHotPrices);
  const topProducts = useMemo(() => products.slice(0, 16), [products]);
  const isSuccess = status === 'fulfilled';

  const cards = isSuccess
    ? topProducts.map(product => (
        <ProductCard product={product} key={product.id} />
      ))
    : skeletons;

  return (
    <section {...props} className={cn(className, classes.carousel)}>
      <HorizontalCarousel>
        <div className={classes.carousel__header}>
          <Text.H2 element="h2" className={classes.carousel__title}>
            Hot prices
          </Text.H2>
          <div className={classes.carousel__buttons}>
            <HorizontalCarousel.PrevButton
              className={classes.carousel__button}
            />
            <HorizontalCarousel.NextButton
              className={classes.carousel__button}
            />
          </div>
        </div>

        <HorizontalCarousel.View
          slides={cards}
          className={classes.carousel__view}
        />
      </HorizontalCarousel>
    </section>
  );
};
