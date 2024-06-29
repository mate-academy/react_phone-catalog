import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Product } from '../../../../types';
import { Icon } from '../../../shared/ui/Icon';
import { Text } from '../../../shared/ui/Text';
import { RoundButton } from '../../../shared/ui/RoundButton';
import { selectInCart, useCart } from '../../../../app/features/cart';
import { useAppSelector } from '../../../../app/hooks';
import classes from './cartCard.module.scss';

type Props = ComponentPropsWithoutRef<'div'> & {
  product: Product;
};

export const CartCard: FC<Props> = ({ className, product, ...props }) => {
  const { removeFromCart, addOne, removeOne } = useCart();
  const cart = useAppSelector(selectInCart);
  const count = cart[product.itemId];

  const removeProduct = () => removeFromCart({ itemId: product.itemId });
  const increase = () => addOne({ itemId: product.itemId });
  const decrease = () => removeOne({ itemId: product.itemId });
  const link = `/${product.category}/${product.itemId}`;

  return (
    <div {...props} className={cn(classes.card, className)}>
      <div className={cn(classes.card__row, classes.card__row_first)}>
        <button className={classes.card__removeButton} onClick={removeProduct}>
          <Icon variant="cross" />
        </button>
        <Link className={classes.card__imgLink} to={link}>
          <img
            className={classes.card__img}
            src={product.image}
            alt={product.name}
          />
        </Link>

        <Link className={classes.card__nameLink} to={link}>
          <Text className={classes.card__name}>{product.name}</Text>
        </Link>
      </div>

      <div className={classes.card__row}>
        <div className={classes.card__controlls}>
          <RoundButton
            className={classes.card__counterButton}
            onClick={decrease}
            disabled={count < 2}
          >
            <Icon variant="minus" />
          </RoundButton>
          <Text className={classes.card__count}>{count}</Text>
          <RoundButton
            className={classes.card__counterButton}
            onClick={increase}
            disabled={count >= 99}
          >
            <Icon variant="plus" />
          </RoundButton>
        </div>

        <Text.H3 className={classes.card__price}>
          ${product.price * count}
        </Text.H3>
      </div>
    </div>
  );
};
