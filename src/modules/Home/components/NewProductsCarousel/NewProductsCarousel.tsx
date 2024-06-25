/* eslint-disable @typescript-eslint/indent */
import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import {
  selectNewProducts,
  useProducts,
} from '../../../../app/features/products';
import { Text } from '../../../shared/ui/Text';
import { ProductCard } from '../../../shared/ProductCard';
import { HorizontalCarousel } from '../../../shared/HorizontalCarousel';
import classes from './newProductsCarousel.module.scss';

type Props = ComponentPropsWithoutRef<'div'>;

const skeletons = Array.from(Array(4), (_, i) => (
  <ProductCard.Skeleton key={i} />
));

export const NewProductsCarousel: FC<Props> = ({ className, ...props }) => {
  const { products, status } = useProducts(selectNewProducts);
  const isSuccess = status === 'fulfilled';

  const cards = isSuccess
    ? products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))
    : skeletons;

  return (
    <section {...props} className={cn(className, classes.carousel)}>
      <HorizontalCarousel>
        <div className={classes.carousel__header}>
          <Text.H2 element="h2" className={classes.carousel__title}>
            Brand new models
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
