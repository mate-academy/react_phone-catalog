import React, { FC } from 'react';

import { Text } from '../Text';
import { useProductCard } from './ProductCardContext';
import classes from './productCard.module.scss';

type Props = {};

export const ProductCardTitle: FC<Props> = ({}) => {
  const { name } = useProductCard();

  return (
    <Text element="h3" className={classes.card__name}>
      {name}
    </Text>
  );
};
