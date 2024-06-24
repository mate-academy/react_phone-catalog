import { Dispatch } from 'react';
import { ActionTypes } from 'src/types/ActionTypes';
import { Details } from 'src/types/Details';
import { Product } from 'src/types/Product';

export const handleAddToCart = (dispatch: Dispatch<any>, data: Details) => {
  dispatch({ type: ActionTypes.AddToCart, payload: { id: data.id } });
  const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
  const isItemInCart = currentCart.some(
    (item: Product) => item.itemId === data.id,
  );

  if (!isItemInCart) {
    const updatedCart = [...currentCart, data];

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }
};

export const handleRemoveFromCart = (
  dispatch: Dispatch<any>,
  data: Details,
) => {
  dispatch({ type: ActionTypes.RemoveFromCart, payload: { id: data.id } });

  const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');

  const updatedCart = currentCart.filter(
    (item: Product) => item.itemId !== data.id,
  );
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const handleAddFavourite = (dispatch: Dispatch<any>, data: Details) => {
  dispatch({ type: ActionTypes.AddToFavourites, payload: { id: data.id } });

  const currentCart = JSON.parse(localStorage.getItem('favourites') || '[]');
  const isItemInCart = currentCart.some(
    (item: Product) => item.itemId === data.id,
  );

  if (!isItemInCart) {
    const updatedCart = [...currentCart, data];
    localStorage.setItem('favourites', JSON.stringify(updatedCart));
  }
};

export const handleRemoveFromFavourite = (
  dispatch: Dispatch<any>,
  data: Details,
) => {
  dispatch({ type: ActionTypes.RemoveFromfavourite, payload: { id: data.id } });

  const currentCart = JSON.parse(localStorage.getItem('favourites') || '[]');

  const updatedCart = currentCart.filter(
    (item: Product) => item.itemId !== data.id,
  );
  localStorage.setItem('favourites', JSON.stringify(updatedCart));
};
