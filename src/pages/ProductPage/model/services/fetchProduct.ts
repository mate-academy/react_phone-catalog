/* eslint-disable @typescript-eslint/indent */
import { CategoriesEnum } from '../../../../entities/Categories';
import {
  LOCAL_STORAGE_CART_PRODUCTS,
  LOCAL_STORAGE_FAVORITES,
} from '../../../../entities/Product';
import { ICartItemsLocalStorage } from '../../../../shared/lib/hooks/useLocalStorage';
import {
  ProductDetails,
  ProductDetailsFromServer,
} from '../types/productDetails';

export const fetchProductsPage = async (
  categoty: CategoriesEnum,
  itemId: string,
): Promise<ProductDetails | null> => {
  try {
    const response = await fetch(`api/${categoty}.json`)
      .then(res => res.json())
      .then((products: ProductDetailsFromServer[]) =>
        products.find(product => product.id === itemId),
      );

    if (!response) {
      return null;
    }

    const prepareFavorites = localStorage.getItem(LOCAL_STORAGE_FAVORITES);
    const favorites: string[] = prepareFavorites
      ? JSON.parse(prepareFavorites)
      : [];

    const prepareCartItems = localStorage.getItem(LOCAL_STORAGE_CART_PRODUCTS);
    const cartItems: ICartItemsLocalStorage[] = prepareCartItems
      ? JSON.parse(prepareCartItems)
      : [];

    const result: ProductDetails = {
      ...response,
      cartItem: cartItems.find(item => item.itemId === response.id)
        ? true
        : false,
      favorite: favorites.includes(response.id) ? true : false,
    };

    return result;
  } catch (e) {
    throw new Error('error');
  }
};
