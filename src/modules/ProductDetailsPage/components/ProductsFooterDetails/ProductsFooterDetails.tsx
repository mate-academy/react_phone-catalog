import React from 'react';
import { FooterSlider } from '../../../shared/FooterSlider';
import { DetailsProduct } from '../../../../types/productTypes';
import { useCart } from '../../../../hooks/useCart';
import { useFavourites } from '../../../../hooks/useFavourites';
import { useAppContext } from '../../../../hooks/useAppContext';
import { getAssetUrl } from '../../../../api/utilis';

type DetailsProps = {
  item: DetailsProduct;
};

export const ProductsFooterDetails = ({ item }: DetailsProps) => {
  const { cart, addToCart } = useCart();
  const { favourites, addToFavourites, removeFromFavourites } = useFavourites();
  const {
    state: { products },
  } = useAppContext();

  const foundedProduct = products.find(product => product.itemId === item.id);

  const isInFavourites = favourites.some(
    product => product.itemId === foundedProduct?.itemId,
  );

  const handleClickFavourites = () => {
    if (foundedProduct) {
      if (!isInFavourites) {
        addToFavourites(foundedProduct);
      } else {
        removeFromFavourites(foundedProduct.itemId);
      }
    }
  };

  const productToBasket = () => ({
    id: item.id,
    quantity: 1,
    product: {
      name: item.name,
      price: item.priceDiscount,
      image: item.images[0],
      category: item.category,
    },
  });

  const isInCart = cart.some(product => product.id === item.id);

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
      cartPage={true}
      onClick={handleClickBasket}
      onClickFavourites={handleClickFavourites}
      title={buttonText}
      isInCart={isInCart}
      image={activeImg}
    />
  );
};
