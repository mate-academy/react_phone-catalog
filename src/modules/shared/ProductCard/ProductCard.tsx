import React, { ComponentProps, FC } from 'react';

import { Product } from '../../../types';
import { selectInCart, useCart } from '../../../app/features/cart';
import {
  selectFavourites,
  useFavourites,
} from '../../../app/features/favourites';
import { ProductCard as GenericProductCard } from '../ui/ProductCard';

type Props = ComponentProps<'article'> & {
  product: Product;
  showFullPrice?: boolean;
};

export const ProductCard: FC<Props> = ({
  product,
  showFullPrice = false,
  ...props
}) => {
  const [favourites, { toggle }] = useFavourites(selectFavourites);
  const [inCart, { addToCart }] = useCart(selectInCart);
  const isFavourite = favourites.includes(product.id);
  const isInCart = Boolean(inCart[product.id]);

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
