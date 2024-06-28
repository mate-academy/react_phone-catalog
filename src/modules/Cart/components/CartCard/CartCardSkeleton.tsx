import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import { Icon } from '../../../shared/ui/Icon';
import { Skeleton } from '../../../shared/ui/Skeleton';
import { RoundButton } from '../../../shared/ui/RoundButton';
import { Text } from '../../../shared/ui/Text';
import classes from './cartCard.module.scss';

type Props = ComponentPropsWithoutRef<'div'> & {
  count: number;
};

export const CartCardSkeleton: FC<Props> = ({ className, count, ...props }) => {
  return (
    <div {...props} className={cn(classes.card, className)}>
      <div className={cn(classes.card__row, classes.card__row_first)}>
        <button className={classes.card__removeButton} disabled>
          <Icon variant="cross" />
        </button>
        <Skeleton className={classes.card__imgLink} />

        <Skeleton
          className={cn(
            classes.card__nameLink,
            classes.card__nameLink_skeleton,
          )}
        />
      </div>

      <div className={classes.card__row}>
        <div className={classes.card__controlls}>
          <RoundButton className={classes.card__counterButton} disabled={true}>
            <Icon variant="minus" />
          </RoundButton>
          <Text className={classes.card__count}>{count}</Text>
          <RoundButton className={classes.card__counterButton} disabled={true}>
            <Icon variant="plus" />
          </RoundButton>
        </div>

        <Skeleton
          className={cn(classes.card__price, classes.card__price_skeleton)}
        />
      </div>
    </div>
  );
};
