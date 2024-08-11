import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';
import pluralize from 'pluralize';

import classes from './checkout.module.scss';
import { useAppSelector } from '../../../../app/hooks';
import { selectInCart } from '../../../../app/features/cart';
import { useFetchedData } from '../../../../hooks/useFetchedData';
import {
  fetchProducts,
  selectProducts,
} from '../../../../app/features/products';
import { Text } from '../../../shared/ui/Text';
import { Button } from '../../../shared/ui/Button';
import { Skeleton } from '../../../shared/ui/Skeleton';

type Props = ComponentPropsWithoutRef<'div'> & {
  onCheckout?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Checkout: FC<Props> = ({ className, onCheckout, ...props }) => {
  const cart = useAppSelector(selectInCart);
  const { products, status } = useFetchedData(fetchProducts(), selectProducts);
  const isLoaded = status === 'fulfilled';
  const numberOfItems = Object.values(cart).reduce(
    (currentItemCount, newItemCount) => currentItemCount + newItemCount,
    0,
  );

  const total = products.reduce((currentTotal, product) => {
    const numberOfProductInCart = cart[product.itemId];

    if (!numberOfProductInCart) {
      return currentTotal;
    }

    return currentTotal + numberOfProductInCart * product.price;
  }, 0);

  return (
    <div {...props} className={cn(classes.checkout, className)}>
      <div className={classes.checkout__info}>
        {isLoaded ? (
          <Text.H2 className={classes.checkout__totalPrice}>${total}</Text.H2>
        ) : (
          <Skeleton
            className={cn(
              classes.checkout__totalPrice,
              classes.checkout__totalPrice_skeleton,
            )}
          />
        )}
        <Text className={classes.checkout__totlaItems}>
          Total for {numberOfItems} {pluralize('item', numberOfItems)}
        </Text>
      </div>
      <Button onClick={onCheckout} className={classes.checkout__button}>
        Checkout
      </Button>
    </div>
  );
};
