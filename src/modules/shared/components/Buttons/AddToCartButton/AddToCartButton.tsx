import React, { useCallback } from 'react';
import './AddToCartButton.scss';
import { TextButton } from '../TextButton';
import { IconButton } from '../IconButton';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { Product } from '../../../../../types/Product';
import { useLanguage } from '../../../../../context/LanguageContext';

type Props = {
  className: string;
  item: Product | undefined;
};

export const AddToCartButton: React.FC<Props> = ({ className, item }) => {
  const { cartItems, setCartItems, favouritesItems, setFavouritesItems } =
    useGlobalContext();
  const { texts } = useLanguage();
  let showAddedCart = false;
  let showActiveIcon = false;

  if (cartItems.length > 0) {
    showAddedCart = cartItems.some(cartItem => cartItem.id === item?.id);
  }

  if (favouritesItems.length > 0) {
    showActiveIcon = favouritesItems.some(
      favoritesItem => favoritesItem.id === item?.id,
    );
  }

  const addToCart = useCallback(() => {
    if (cartItems.some(cartItem => cartItem.id === item?.id)) {
      const newCartItems = cartItems.filter(
        favriteItem => favriteItem.id !== item?.id,
      );

      setCartItems(newCartItems);
    } else {
      if (!showAddedCart && item) {
        setCartItems(current => [
          ...current,
          {
            id: item.id,
            quantity: 1,
            product: item,
          },
        ]);
      }
    }
  }, [cartItems, item, showAddedCart, setCartItems]);

  const addToFavorites = useCallback(() => {
    if (favouritesItems.some(favriteItem => favriteItem.id === item?.id)) {
      const newFavoritesItems = favouritesItems.filter(
        favriteItem => favriteItem.id !== item?.id,
      );

      setFavouritesItems(newFavoritesItems);
    } else {
      if (!showActiveIcon && item) {
        setFavouritesItems(current => [...current, item]);
      }
    }
  }, [favouritesItems, item, showActiveIcon, setFavouritesItems]);

  return (
    <div className={`add-to-cart-button ${className}`}>
      <TextButton
        className="add-to-cart-button__button-left"
        onClick={() => addToCart()}
        text={showAddedCart ? texts.addedToCart : texts.addToCart}
        isActive={showAddedCart}
      />
      <IconButton
        className="add-to-cart-button__button-right"
        name={showActiveIcon ? 'heart-like-red' : 'heart-like'}
        onClick={() => addToFavorites()}
      />
    </div>
  );
};
