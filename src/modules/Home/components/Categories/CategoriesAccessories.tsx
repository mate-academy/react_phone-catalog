import React, { FC } from 'react';

import { Link } from 'react-router-dom';
import cn from 'classnames';

import {
  fetchProducts,
  selectAccessories,
} from '../../../../app/features/products';
import { useFetchedData } from '../../../../hooks/useFetchedData';
import { Text } from '../../../shared/ui/Text';
import { Skeleton } from '../../../shared/ui/Skeleton';
import { IMG } from './variables';
import classes from './categories.module.scss';

type Props = {};

export const CategoriesAccessories: FC<Props> = ({}) => {
  const { products, status } = useFetchedData(
    fetchProducts(),
    selectAccessories,
  );

  return (
    <div className={classes.categories__item}>
      <Link
        to={'accessories'}
        className={cn(
          classes.categories__imgContainer,
          classes.categories__imgContainer_accessories,
        )}
      >
        <img
          src={IMG.ACCESSORIES}
          alt="accessories"
          className={cn(
            classes.categories__img,
            classes.categories__img_accessories,
          )}
        />
      </Link>
      <div className={classes.categories__itemInfo}>
        <Link to={'accessories'} className={classes.categories__nameLink}>
          <Text.H4 className={classes.categories__name}>Accessories</Text.H4>
        </Link>
        {status === 'pending' ? (
          <Skeleton
            className={cn(
              classes.categories__count,
              classes.categories__count_loading,
            )}
          />
        ) : (
          <Text className={classes.categories__count}>
            {products.length} models
          </Text>
        )}
      </div>
    </div>
  );
};
