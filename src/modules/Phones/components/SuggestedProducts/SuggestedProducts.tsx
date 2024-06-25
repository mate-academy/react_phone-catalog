import React, { ComponentPropsWithoutRef, FC, useMemo } from 'react';
import cn from 'classnames';

import { getRandomNumbers } from '../../../../utils/getRandomNumbers';
import { useProducts, selectProducts } from '../../../../app/features/products';
import { Text } from '../../../shared/ui/Text';
import { HorizontalCarousel } from '../../../shared/HorizontalCarousel';
import { ProductCard } from '../../../shared/ProductCard';
import classes from './suggestedProducts.module.scss';

type Props = ComponentPropsWithoutRef<'div'>;

const skeletons = Array.from(Array(4), (_, i) => (
  <ProductCard.Skeleton key={i} />
));

export const SuggestedProducts: FC<Props> = ({ className, ...props }) => {
  const { products, status } = useProducts(selectProducts);
  const isSuccess = status === 'fulfilled';

  const productCards = useMemo(
    () =>
      getRandomNumbers(10, 0, products.length).map(index => (
        <ProductCard product={products[index]} key={products[index].id} />
      )),
    [products],
  );

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
