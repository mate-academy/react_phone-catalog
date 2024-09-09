import { ICartItemsLocalStorage } from '../../../../shared/lib/hooks/useLocalStorage';
import {
  LOCAL_STORAGE_CART_PRODUCTS,
  LOCAL_STORAGE_FAVORITES,
  Product,
  ProductFromServer,
} from '../types/product';

export const modernizationProducts = (
  products: ProductFromServer[],
  // productsInfo: ProductInfo[],
): Product[] => {
  try {
    const favoritesLocalStorage = localStorage.getItem(LOCAL_STORAGE_FAVORITES);
    const cartItemsLocalStorage = localStorage.getItem(
      LOCAL_STORAGE_CART_PRODUCTS,
    );
    const favorites: string[] | null = favoritesLocalStorage
      ? JSON.parse(favoritesLocalStorage)
      : null;
    const cartItem: ICartItemsLocalStorage[] = cartItemsLocalStorage
      ? JSON.parse(cartItemsLocalStorage)
      : null;

    const newProducts: Product[] = [...products].map(
      (product: ProductFromServer) => {
        const isCartItem = cartItem.find(
          item => item.itemId === product.itemId,
        );

        return {
          ...product,
          favorite: favorites?.includes(product.itemId) ? true : false,
          cartItem: isCartItem ? isCartItem.count : false,
        };
      },
    );

    return newProducts;
  } catch (e) {
    throw new Error('Error processing products');
  }
};