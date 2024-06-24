import { Dispatch } from 'react';
import { ActionTypes } from 'src/types/ActionTypes';
import { Product } from 'src/types/Product';

export const handleAddToCart = (dispatch: Dispatch<any>, data: Product) => {
  dispatch({ type: ActionTypes.AddToCart, payload: { id: data.itemId } });

  //set amount to 1 for next manipulations with amount of product in cart
  const newData = { ...data, amount: 1 };

  const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
  const isItemInCart = currentCart.some(
    (item: Product) => item.itemId === newData.itemId,
  );

  if (!isItemInCart) {
    const updatedCart = [...currentCart, newData];

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }
};

export const handleRemoveFromCart = (
  dispatch: Dispatch<any>,
  data: Product,
) => {
  dispatch({ type: ActionTypes.RemoveFromCart, payload: { id: data.itemId } });

  const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');

  const updatedCart = currentCart.filter(
    (item: Product) => item.itemId !== data.itemId,
  );
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const handleAddFavourite = (dispatch: Dispatch<any>, data: Product) => {
  dispatch({ type: ActionTypes.AddToFavourites, payload: { id: data.itemId } });

  const currentCart = JSON.parse(localStorage.getItem('favourites') || '[]');
  const isItemInCart = currentCart.some(
    (item: Product) => item.itemId === data.itemId,
  );

  if (!isItemInCart) {
    const updatedCart = [...currentCart, data];
    localStorage.setItem('favourites', JSON.stringify(updatedCart));
  }
};

export const handleRemoveFromFavourite = (
  dispatch: Dispatch<any>,
  data: Product,
) => {
  dispatch({
    type: ActionTypes.RemoveFromfavourite,
    payload: { id: data.itemId },
  });

  const currentCart = JSON.parse(localStorage.getItem('favourites') || '[]');

  const updatedCart = currentCart.filter(
    (item: Product) => item.itemId !== data.itemId,
  );
  localStorage.setItem('favourites', JSON.stringify(updatedCart));
};
