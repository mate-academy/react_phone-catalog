import React from 'react';
import { Product } from '../../../../../types/productTypes';
import { FooterSlider } from '../../../FooterSlider';
import { useCart } from '../../../../../hooks/useCart';
import { useFavourites } from '../../../../../hooks/useFavourites';
import { getAssetUrl } from '../../../../../api/utilis';

type FooterProps = {
  item: Product;
};

export const ProductsFooterItem = ({ item }: FooterProps) => {
  const { cart, addToCart } = useCart();
  const { favourites, addToFavourites, removeFromFavourites } = useFavourites();

  const productToBasket = () => ({
    id: item.itemId,
    quantity: 1,
    product: {
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    },
  });

  const isInCart = cart.some(product => product.id === item.itemId);
  const isInFavourites = favourites.some(
    product => product.itemId === item.itemId,
  );

  const handleClickFavourites = () => {
    if (!isInFavourites) {
      addToFavourites(item);
    } else {
      removeFromFavourites(item.itemId);
    }
  };

  const handleClickBasket = () => {
    if (!isInCart) {
      const basketItem = productToBasket();

      addToCart(basketItem);
    }
  };

  const buttonText = isInCart ? 'Added to cart' : 'Add to cart';
  const activeImg = isInFavourites
    ? getAssetUrl('icons/Favourites_check.svg')
    : getAssetUrl('icons/Favourites.svg');

  return (
    <FooterSlider
      cartPage={false}
      onClick={handleClickBasket}
      onClickFavourites={handleClickFavourites}
      title={buttonText}
      isInCart={isInCart}
      image={activeImg}
    />
  );
};
