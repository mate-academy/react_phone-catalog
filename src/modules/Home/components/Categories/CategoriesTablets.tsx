import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { selectTablets, useProducts } from '../../../../app/features/products';
import { Text } from '../../../shared/ui/Text';
import { Skeleton } from '../../../shared/ui/Skeleton';
import { IMG } from './variables';
import classes from './categories.module.scss';

type Props = {};

export const CategoriesTablets: FC<Props> = ({}) => {
  const { products, status } = useProducts(selectTablets);

  return (
    <div className={classes.categories__item}>
      <Link
        to={'tablets'}
        className={cn(
          classes.categories__imgContainer,
          classes.categories__imgContainer_tablets,
        )}
      >
        <img
          src={IMG.TABLETS}
          alt="tablets"
          className={cn(
            classes.categories__img,
            classes.categories__img_tablets,
          )}
        />
      </Link>
      <div className={classes.categories__itemInfo}>
        <Link to={'tablets'} className={classes.categories__nameLink}>
          <Text variant="heading-4" className={classes.categories__name}>
            Tablets
          </Text>
        </Link>
        {status === 'pending' ? (
          <Skeleton
            className={cn(
              classes.categories__count,
              classes.categories__count_loading,
            )}
          />
        ) : (
          <Text className={classes.categories__count} variant="regular">
            {products.length} models
          </Text>
        )}
      </div>
    </div>
  );
};
