import React from 'react';
import { ProductType } from '../../types/ProductType';
import { CartProductType } from '../../types/CartProductType';
import style from './ProductActions.module.scss';
import { AddCartButton } from '../AddCartButton/AddCartButton';
import { AddFavButton } from '../AddFavButton/AddFavButton';
import { HeartIcon } from '../Icons/HeartIcon';
import { HeartIconFilled } from '../Icons/HeartIconFilled';

interface Props {
  product: ProductType | undefined;
  isInCart: CartProductType | undefined;
  isFavourite: ProductType | undefined;
}

export const ProductActions: React.FC<Props> = ({
  isFavourite,
  isInCart,
  product,
}) => {
  return (
    <div className={style.product_details__actions}>
      {product && (
        <AddCartButton product={product} isInCart={!!isInCart}>
          {isInCart ? 'Remove' : 'Add to Cart'}
        </AddCartButton>
      )}
      {product && (
        <AddFavButton product={product} isFavourite={!!isFavourite}>
          {isFavourite ? <HeartIconFilled /> : <HeartIcon />}
        </AddFavButton>
      )}
    </div>
  );
};
