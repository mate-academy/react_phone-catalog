import React, { FC } from 'react';

import { Text } from '../Text';
import { useProductCard } from './ProductCardContext';
import classes from './productCard.module.scss';

type Props = {
  isOnSale?: boolean;
};

export const ProductCardPrice: FC<Props> = ({ isOnSale }) => {
  const { fullPrice, price } = useProductCard();

  return (
    <div className={classes.card__prices}>
      <Text.H3 className={classes.card__regularPrice}>${price}</Text.H3>
      {isOnSale && (
        <span className={classes.card__fullPrice}>${fullPrice}</span>
      )}
    </div>
  );
};
