import React, { FC } from 'react';

import { useProductCard } from './ProductCardContext';
import classes from './productCard.module.scss';

type Props = {};

export const ProductCardImage: FC<Props> = () => {
  const { image, name } = useProductCard();

  return <img src={image} alt={name} className={classes.card__img} />;
};
