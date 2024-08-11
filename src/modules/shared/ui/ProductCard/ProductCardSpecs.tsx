import React, { FC } from 'react';

import { Text } from '../Text';
import { useProductCard } from './ProductCardContext';
import classes from './productCard.module.scss';
import { SpecsList, Spec, getSpecsFromObject } from '../SpecsList';

type Props = {};

export const ProductCardSpecs: FC<Props> = ({}) => {
  const { screen, capacity, ram } = useProductCard();
  const specs: Spec[] = getSpecsFromObject({ screen, capacity, ram });

  return (
    <SpecsList
      className={classes.card__specs}
      Title={Text.Small}
      Value={Text.Small}
      specs={specs}
    />
  );
};
