import React, { ComponentPropsWithoutRef, FC, useMemo } from 'react';
import cn from 'classnames';

import {
  selectShuffledProducts,
  fetchProducts,
} from '../../../../app/features/products';
import { useFetchedData } from '../../../../hooks/useFetchedData';
import { Text } from '../../../shared/ui/Text';
import { HorizontalCarousel } from '../../../shared/HorizontalCarousel';
import { ProductCard } from '../../../shared/ProductCard';
import classes from './suggestedProducts.module.scss';

type Props = ComponentPropsWithoutRef<'div'> & {
  productId: string;
};

const skeletons = Array.from(Array(4), (_, i) => (
  <ProductCard.Skeleton key={i} />
));

export const SuggestedProducts: FC<Props> = ({
  className,
  productId,
  ...props
}) => {
  const { products, status } = useFetchedData(
    fetchProducts(),
    selectShuffledProducts,
  );

  const requiredProducts = useMemo(
    () => products.filter(product => product.itemId !== productId).slice(0, 16),
    [products, productId],
  );

  const isSuccess = status === 'fulfilled';

  const productCards = requiredProducts.map(product => (
    <ProductCard product={product} key={product.id} />
  ));

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
          slides={isSuccess ? productCards : skeletons}
          className={classes.carousel__view}
        />
      </HorizontalCarousel>
    </section>
  );
};
