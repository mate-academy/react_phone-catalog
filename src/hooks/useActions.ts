import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useAppDispatch } from './typedHooks';
import {
  addCart,
  deleteCart,
  toggleCart,
  checkoutItems,
} from '../store/features/cart/cart.slice';
import { addFavourites } from '@store/features/favourites/favourites.slice';
import { setSortBy } from '@store/features/product/product.slice';

const rootAction = {
  addCart,
  deleteCart,
  toggleCart,
  checkoutItems,
  addFavourites,
  setSortBy,
};

export const useAction = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(rootAction, dispatch), []);
};
