import React, { FC } from 'react';

import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { useProductCard } from './ProductCardContext';
import { RequiredProduct } from './type';
import classes from './productCard.module.scss';

type Props = {
  isFavourite: boolean;
  handleFavouriteClick: (product: RequiredProduct) => void;
  isInCart: boolean;
  handleAddToCart: (product: RequiredProduct) => void;
};

export const ProductCardActions: FC<Props> = ({
  handleAddToCart,
  handleFavouriteClick,
  isFavourite,
  isInCart,
}) => {
  const product = useProductCard();

  return (
    <div className={classes.card__buttons}>
      <Button
        onClick={() => handleAddToCart(product)}
        variant={isInCart ? 'inversed' : 'regular'}
        className={classes.card__addToCartButton}
      >
        {isInCart ? 'Added' : 'Add to cart'}
      </Button>
      <Checkbox
        title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        className={classes.card__addToCartFavourites}
        checked={isFavourite}
        onChange={() => handleFavouriteClick(product)}
      >
        <Icon variant={isFavourite ? 'heart-fill' : 'heart'} />
      </Checkbox>
    </div>
  );
};
