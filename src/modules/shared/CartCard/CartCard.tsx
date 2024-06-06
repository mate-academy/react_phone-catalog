import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';
import { Link, To } from 'react-router-dom';

import { Product } from '../../../types';
import { Icon } from '../ui/Icon';
import { Text } from '../ui/Text';
import classes from './cartCard.module.scss';
import { RoundButton } from '../ui/RoundButton';

type Props = ComponentProps<'div'> & {
  to: To;
  product: Pick<Product, 'image' | 'name' | 'price'>;
  count: number;
  increase: () => void;
  decrease: () => void;
  removeProduct: () => void;
};

export const CartCard: FC<Props> = ({
  className,
  product: { image, name, price },
  count,
  decrease,
  increase,
  removeProduct,
  to,
  ...props
}) => {
  return (
    <div {...props} className={cn(classes.card, className)}>
      <div className={cn(classes.card__row, classes.card__row_first)}>
        <button className={classes.card__removeButton} onClick={removeProduct}>
          <Icon variant="cross" />
        </button>
        <Link className={classes.card__imgLink} to={to}>
          <img className={classes.card__img} src={image} alt={name} />
        </Link>

        <Link className={classes.card__nameLink} to={to}>
          <Text className={classes.card__name}>{name}</Text>
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
            disabled={count > 99}
          >
            <Icon variant="plus" />
          </RoundButton>
        </div>

        <Text.H3 className={classes.card__price}>${price}</Text.H3>
      </div>
    </div>
  );
};
