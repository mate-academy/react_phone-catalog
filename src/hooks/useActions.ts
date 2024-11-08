import { useMemo } from 'react';

import { bindActionCreators } from '@reduxjs/toolkit';

import { getAccessories } from '@store/features/accessories/getAccessoriesApi';
import {
  addCart,
  checkoutItems,
  deleteCart,
  toggleCart,
} from '@store/features/cart/cart.slice';
import { addFavourites } from '@store/features/favourites/favourites.slice';
import { getPhones } from '@store/features/phones/getPhoneApi';
import { getProducts } from '@store/features/product/getProductsApi';
import { setSortBy } from '@store/features/product/product.slice';
import { getTablets } from '@store/features/tablets/getTabletsApi';

import { useAppDispatch } from './typedHooks';

const rootAction = {
  getProducts,
  getPhones,
  getTablets,
  getAccessories,
  addCart,
  deleteCart,
  toggleCart,
  checkoutItems,
  addFavourites,
  setSortBy,
};

export const useAction = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
