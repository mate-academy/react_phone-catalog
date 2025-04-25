import React from 'react';
import style from './ProductActions.module.scss';
import { ProductType } from '../../types/ProductType';
import { CartProductType } from '../../types/CartProductType';
import { AddCardButton } from '../AddCardButton/AddCardButton';
import { AddFavButton } from '../AddFavButton/AddFavButton';
import { HeartIconFilled } from '../Icons/HeartIconFilled';
import { HeartIcon } from '../Icons/HeartIcon';

interface Props {
  isFavourite: ProductType | undefined;
  isInCart: CartProductType | undefined;
  product: ProductType | undefined;
}

export const ProductActions: React.FC<Props> = ({
  isFavourite,
  product,
  isInCart,
}) => {
  return (
    <div className={style.product_details__actions}>
      {product && (
        <AddCardButton product={product} isInCart={!!isInCart}>
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </AddCardButton>
      )}

      {product && (
        <AddFavButton product={product} isFavourite={!!isFavourite}>
          {isFavourite ? <HeartIconFilled /> : <HeartIcon />}
        </AddFavButton>
      )}
    </div>
  );
};
