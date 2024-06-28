import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { fetchProducts, selectPhones } from '../../../../app/features/products';
import { useFetchedData } from '../../../../hooks/useFetchedData';
import { Text } from '../../../shared/ui/Text';
import { Skeleton } from '../../../shared/ui/Skeleton';
import { IMG } from './variables';
import classes from './categories.module.scss';

type Props = {};

export const CategoriesPhones: FC<Props> = ({}) => {
  const { products, status } = useFetchedData(fetchProducts(), selectPhones);

  return (
    <div className={classes.categories__item}>
      <Link
        to={'phones'}
        className={cn(
          classes.categories__imgContainer,
          classes.categories__imgContainer_phones,
        )}
      >
        <img
          src={IMG.PHONES}
          alt="phones"
          className={cn(
            classes.categories__img,
            classes.categories__img_phones,
          )}
        />
      </Link>
      <div className={classes.categories__itemInfo}>
        <Link to={'phones'} className={classes.categories__nameLink}>
          <Text.H4 className={classes.categories__name}>Mobile phones</Text.H4>
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
