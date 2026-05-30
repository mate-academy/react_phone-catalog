import { useState } from 'react';

export enum DataNames {
  favourites = 'favourites',
  cart = 'cart',
}

export const useProductsStorage = () => {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [favouritesItems, setFavouritesItems] = useState<string[]>([]);

  function addProduct(place: DataNames, id: string) {
    if (place === DataNames.cart) {
      setCartItems(prev => [...prev, id]);
    } else {
      setFavouritesItems(prev => [...prev, id]);
    }
  }

  function removeProduct(place: DataNames, id: string) {
    if (place === DataNames.cart) {
      setCartItems(prev => prev.filter(el => el !== id));
    } else {
      setFavouritesItems(prev => prev.filter(el => el !== id));
    }
  }

  function findProduct(place: DataNames, id: string): boolean {
    if (place === DataNames.cart) {
      return cartItems.includes(id);
    } else {
      return favouritesItems.includes(id);
    }
  }

  return {
    cartItems,
    favouritesItems,
    findProduct,
    addProduct,
    removeProduct,
  };
};
