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
        <Text.Small className={classes.card__specTitle}>Screen</Text.Small>
        <span className={classes.card__specValue}>{screen}</span>
      </li>
      <li className={classes.card__spec}>
        <Text.Small className={classes.card__specTitle}>Capacity</Text.Small>
        <span className={classes.card__specValue}>{capacity}</span>
      </li>
      <li className={classes.card__spec}>
        <Text.Small className={classes.card__specTitle}>RAM</Text.Small>
        <span className={classes.card__specValue}>{ram}</span>
      </li>
    </ul>
  );
};
