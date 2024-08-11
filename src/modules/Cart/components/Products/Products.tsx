/* eslint-disable  @typescript-eslint/indent */
import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import {
  fetchProducts,
  selectProducts,
} from '../../../../app/features/products';
import { useFetchedData } from '../../../../hooks/useFetchedData';
import classes from './products.module.scss';
import { useAppSelector } from '../../../../app/hooks';
import { selectInCart } from '../../../../app/features/cart';
import { CartCard } from '../CartCard';

type Props = ComponentPropsWithoutRef<'div'>;

export const Products: FC<Props> = ({ className, ...props }) => {
  const cart = useAppSelector(selectInCart);
  const { products, status } = useFetchedData(fetchProducts(), selectProducts);
  const isLoaded = status === 'fulfilled';

  const skeletons = Object.entries(cart).map(([key, count]) => (
    <CartCard.Skeleton count={count} key={key} />
  ));

  const productsinCart = products.filter(product => cart[product.itemId]);

  return (
    <div {...props} className={cn(classes.products, className)}>
      {isLoaded
        ? productsinCart.map(product => (
            <CartCard product={product} key={product.id} />
          ))
        : skeletons}
    </div>
  );
};
