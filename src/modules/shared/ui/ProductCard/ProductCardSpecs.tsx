import React, { FC } from 'react';

import { Text } from '../Text';
import { useProductCard } from './ProductCardContext';
import classes from './productCard.module.scss';

type Props = {};

export const ProductCardSpecs: FC<Props> = ({}) => {
  const { screen, capacity, ram } = useProductCard();

  return (
    <ul className={classes.card__specs}>
      <li className={classes.card__spec}>
        <Text className={classes.card__specTitle} variant="small">
          Screen
        </Text>
        <span className={classes.card__specValue}>{screen}</span>
      </li>
      <li className={classes.card__spec}>
        <Text className={classes.card__specTitle} variant="small">
          Capacity
        </Text>
        <span className={classes.card__specValue}>{capacity}</span>
      </li>
      <li className={classes.card__spec}>
        <Text className={classes.card__specTitle} variant="small">
          RAM
        </Text>
        <span className={classes.card__specValue}>{ram}</span>
      </li>
    </ul>
  );
};
