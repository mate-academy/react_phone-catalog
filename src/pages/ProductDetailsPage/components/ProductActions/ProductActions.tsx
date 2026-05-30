import React from 'react';
import { CartProduct, Product } from '../../../../types';
import {
  AddToCartButton,
  AddToFavButton,
  HeartFilledIcon,
  HeartIcon,
} from '../../../../components';

type Props = {
  product: Product | undefined;
  isInCart: CartProduct | undefined;
  isFavourite: Product | undefined;
};

export const ProductActions: React.FC<Props> = ({
  product,
  isInCart,
  isFavourite,
}) => (
  <div className="product-details__actions">
    {product && (
      <AddToCartButton product={product} isInCart={!!isInCart}>
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </AddToCartButton>
    )}
    {product && (
      <AddToFavButton product={product} isFavourite={!!isFavourite}>
        {isFavourite ? <HeartFilledIcon /> : <HeartIcon />}
      </AddToFavButton>
    )}
  </div>
);
