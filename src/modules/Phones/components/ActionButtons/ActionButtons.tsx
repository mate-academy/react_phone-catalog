import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import {
  selectFavourites,
  useFavourites,
} from '../../../../app/features/favourites';
import { selectInCart, useCart } from '../../../../app/features/cart';
import { Button } from '../../../shared/ui/Button';
import { Checkbox } from '../../../shared/ui/Checkbox';
import { Skeleton } from '../../../shared/ui/Skeleton';
import { Icon } from '../../../shared/ui/Icon';
import classes from './actionButtons.module.scss';

type Props = ComponentPropsWithoutRef<'div'> & {
  productId: string;
  isLoaded: boolean;
};

export const ActionButtons: FC<Props> = ({
  productId,
  className,
  isLoaded,
  ...props
}) => {
  const [favourites, { toggle }] = useFavourites(selectFavourites);
  const [inCart, { addToCart }] = useCart(selectInCart);

  const isFavourite = favourites.includes(productId || '');
  const isInCart = Boolean(inCart[productId || '']);

  if (!isLoaded) {
    return (
      <Skeleton
        {...props}
        className={cn(
          classes.actionButtons,
          classes.actionButtons_skeleton,
          className,
        )}
      />
    );
  }

  return (
    <div className={cn(classes.actionButtons, className)}>
      <Button
        variant={isInCart ? 'inversed' : 'regular'}
        onClick={() => addToCart({ itemId: productId })}
        className={classes.actionButtons__addToCart}
      >
        {isInCart ? 'Added' : 'Add to cart'}
      </Button>
      <Checkbox
        onChange={() => toggle({ itemId: productId })}
        checked={isFavourite}
        className={classes.actionButtons__addToFav}
      >
        <Icon variant={isFavourite ? 'heart-fill' : 'heart'} />
      </Checkbox>
    </div>
  );
};
