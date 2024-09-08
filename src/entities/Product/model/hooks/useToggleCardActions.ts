/* eslint-disable @typescript-eslint/indent */
import { useCallback } from 'react';
import {
  ICartItemsLocalStorage,
  useLocalStorage,
} from '../../../../shared/lib/hooks/useLocalStorage';
import {
  LOCAL_STORAGE_CART_PRODUCTS,
  LOCAL_STORAGE_FAVORITES,
} from '../types/product';
import { useAppDispatch } from '../../../../shared/lib/hooks/reduxHooks';
import { ProductSliceActions } from '../slice/productsSlice';

type TypeReturn = (itemId: string) => void;

export const useToggleCardActions = (): TypeReturn[] => {
  const dispatch = useAppDispatch();

  const [favoriteLocalStorage, setFavoriteLocalStorage] = useLocalStorage<
    string[]
  >(LOCAL_STORAGE_FAVORITES, []);
  const [cartLocalStorage, setCartLocalStorage] = useLocalStorage<
    ICartItemsLocalStorage[]
  >(LOCAL_STORAGE_CART_PRODUCTS, []);

  const toggleFavorite = useCallback(
    (itemId: string) => {
      const curerntFavoriteLocalStorage = [...favoriteLocalStorage];

      if (curerntFavoriteLocalStorage.includes(itemId)) {
        setFavoriteLocalStorage(
          curerntFavoriteLocalStorage.filter(item => item !== itemId),
        );
      } else {
        setFavoriteLocalStorage([...curerntFavoriteLocalStorage, itemId]);
      }
    },
    [favoriteLocalStorage, setFavoriteLocalStorage],
  );

  const toggleCart = useCallback(
    (itemId: string) => {
      const currentCartLocalStorage = [...cartLocalStorage];

      if (currentCartLocalStorage.find(item => item.itemId === itemId)) {
        setCartLocalStorage(
          currentCartLocalStorage.filter(item => item.itemId !== itemId),
        );
        dispatch(ProductSliceActions.removeCartItem(itemId));
      } else {
        setCartLocalStorage([...currentCartLocalStorage, { itemId, count: 1 }]);
        dispatch(ProductSliceActions.addCartItem(itemId));
      }
    },
    [cartLocalStorage, dispatch, setCartLocalStorage],
  );

  return [toggleFavorite, toggleCart];
};
