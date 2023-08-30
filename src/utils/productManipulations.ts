import { Product } from '../types/Product';
import { CartProduct } from '../types/CartProduct';
import {
  setCartItemsToLocaleStorage,
  getCartItemsFromLocaleStorage,
  setFavouritesTolocaleStorage,
  getFavouritesFromLocaleStorage,
} from './updateLocaleStorage';

export const findProductOnCart = (id: string) => {
  let match = false;

  getCartItemsFromLocaleStorage('toBuy').forEach(device => {
    if (device.id === id) {
      match = true;

      return match;
    }

    return match;
  });

  return match;
};

export const findProductOnFavourites = (id: string) => {
  let match = false;

  if (getFavouritesFromLocaleStorage('favourites').length > 0) {
    getFavouritesFromLocaleStorage('favourites').map(device => {
      if (device.id === id) {
        match = true;

        return match;
      }

      return match;
    });
  }

  return match;
};

export const updateFavourites = (
  setChosenProducts: (items: Product[]) => void,
  setLoadingItem: (ind: number | null) => void,
  event: React.SyntheticEvent,
  item: Product,
  favouritesTimeout = 0,
) => {
  event.preventDefault();

  let ProductIndex = 0;

  getFavouritesFromLocaleStorage('favourites').map((device, index) => {
    if (device.id === item.id) {
      ProductIndex = index;
    }

    return null;
  });

  if (findProductOnFavourites(item.id) === false) {
    const toFavourites = [
      ...getFavouritesFromLocaleStorage('favourites'),
      item,
    ];

    setChosenProducts(toFavourites);
    setFavouritesTolocaleStorage('favourites', toFavourites);
  } else {
    setLoadingItem(ProductIndex);

    const toFavourites = [
      ...getFavouritesFromLocaleStorage('favourites').slice(0, ProductIndex),
      ...getFavouritesFromLocaleStorage('favourites').slice(ProductIndex + 1),
    ];

    setChosenProducts(toFavourites as Product[]);

    setTimeout(() => {
      setFavouritesTolocaleStorage('favourites', toFavourites);
      setLoadingItem(null);
    }, favouritesTimeout);
  }
};

export const updateCart = (
  setProductsToBuy: (items: CartProduct[]) => void,
  event: React.SyntheticEvent,
  item: Product,
) => {
  event.preventDefault();

  if (findProductOnCart(item.id) === false) {
    const toBuy = [
      ...getCartItemsFromLocaleStorage('toBuy'),
      {
        id: item.id,
        quantity: 1,
        item,
      },
    ] as CartProduct[];

    setCartItemsToLocaleStorage('toBuy', toBuy);
    setProductsToBuy(toBuy);
  }
};
