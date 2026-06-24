import { useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addToCart } from '../../../features/cart/cartSlice';
import { toggleFavorite } from '../../../features/favorites/favoritesSlice';
import type { Product } from '../../../types/product';

interface UseProductActionsParams {
  product?: Product | null;
  actionProduct?: Product | null;
  hideDiscount?: boolean;
}

const getActionProduct = (product?: Product | null, hideDiscount = false) => {
  if (!product) {
    return undefined;
  }

  if (!hideDiscount) {
    return product;
  }

  return {
    ...product,
    price: product.fullPrice ?? product.price,
    fullPrice: undefined,
  };
};

export const useProductActions = ({
  product,
  actionProduct,
  hideDiscount = false,
}: UseProductActionsParams) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const favorites = useAppSelector(state => state.favorites.items);
  const itemId = product?.itemId;

  const productForAction = useMemo(
    () => getActionProduct(actionProduct ?? product, hideDiscount),
    [actionProduct, hideDiscount, product],
  );

  const isInCart = useMemo(
    () =>
      itemId ? cartItems.some(item => item.product.itemId === itemId) : false,
    [cartItems, itemId],
  );

  const isFavorited = useMemo(
    () => (itemId ? favorites.some(item => item.itemId === itemId) : false),
    [favorites, itemId],
  );

  const handleCartClick = () => {
    if (!itemId || !productForAction || isInCart) {
      return;
    }

    dispatch(addToCart(productForAction));
  };

  const handleFavoriteClick = () => {
    if (productForAction) {
      dispatch(toggleFavorite(productForAction));
    }
  };

  return {
    productForAction,
    isInCart,
    isFavorited,
    handleCartClick,
    handleFavoriteClick,
  };
};
