import { useEffect, useReducer, useState } from 'react';
import { CartItem, initialState, State, storeReducer } from './storeReducer';
import { BaseProduct } from '@shared/types/APITypes';

export const useStore = () => {
  const getInitialState = (): State => {
    try {
      const stored = localStorage.getItem('userStore');

      return stored ? JSON.parse(stored) : initialState;
    } catch {
      return initialState;
    }
  };

  const [state, dispatch] = useReducer(storeReducer, null, getInitialState);

  const getCartAmount = () => {
    return state.cart.reduce((total, cartItem) => total + cartItem.amount, 0);
  };

  const getFavAmount = () => {
    return state.favorites.length;
  };

  const [cartAmount, setCartAmount] = useState(getCartAmount());
  const [favAmount, setFavAmount] = useState(getFavAmount());

  const handleAddFavorite = (id: BaseProduct['id']) => {
    dispatch({ type: 'ADD_TO_FAV', payload: id });
  };

  const handleAddCart = ({ item, amount }: CartItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: { item, amount } });
  };

  const handleRemoveFavorite = (id: BaseProduct['id']) => {
    dispatch({ type: 'REMOVE_FROM_FAV', payload: id });
  };

  const handleRemoveFromCart = ({ item, amount }: CartItem) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { item, amount } });
  };

  const getItemInFavs = (id: BaseProduct['id']) => {
    return state.favorites.some(el => el === id);
  };

  const getItemInCart = (id: BaseProduct['id']) => {
    return state.cart.some(el => el.item === id);
  };

  useEffect(() => {
    setCartAmount(getCartAmount());
  }, [state]);

  useEffect(() => {
    setFavAmount(getFavAmount());
  }, [state]);

  useEffect(() => {
    try {
      localStorage.setItem('userStore', JSON.stringify(state));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to save user data:', error);
    }
  }, [state]);

  return {
    handleAddFavorite,
    handleAddCart,
    handleRemoveFavorite,
    handleRemoveFromCart,
    getItemInFavs,
    getItemInCart,
    cartAmount,
    favAmount,
  };
};
