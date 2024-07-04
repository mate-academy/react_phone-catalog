import React, { ComponentPropsWithoutRef, FC } from 'react';

import { Product } from '../../../types';
import { selectInCart, useCart } from '../../../app/features/cart';
import { useAppSelector } from '../../../app/hooks';
import {
  selectFavourites,
  useFavourites,
} from '../../../app/features/favourites';
import { ProductCard as GenericProductCard } from '../ui/ProductCard';

type Props = ComponentPropsWithoutRef<'article'> & {
  product: Product;
  showFullPrice?: boolean;
};

export const ProductCard: FC<Props> = ({
  product,
  showFullPrice = false,
  ...props
}) => {
  const { items: favourites } = useAppSelector(selectFavourites);
  const inCart = useAppSelector(selectInCart);
  const { toggle } = useFavourites();
  const { addToCart } = useCart();
  const isFavourite = favourites.includes(product.itemId);
  const isInCart = Boolean(inCart[product.itemId]);

  return (
    <GenericProductCard
      {...props}
      product={product}
      to={`/${product.category}/${product.itemId}`}
      name={<GenericProductCard.Name />}
      image={<GenericProductCard.Image />}
      specs={<GenericProductCard.Specs />}
      price={<GenericProductCard.Price isOnSale={showFullPrice} />}
      actions={
        <GenericProductCard.Actions
          handleFavouriteClick={toggle}
          isFavourite={isFavourite}
          handleAddToCart={addToCart}
          isInCart={isInCart}
        />
      }
    />
  );
};
