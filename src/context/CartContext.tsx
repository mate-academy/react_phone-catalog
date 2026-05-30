/* eslint-disable @typescript-eslint/indent */

import React, { createContext, useReducer, useEffect } from 'react';
const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return { items: action.payload };

    //payload = product
    case 'ADD_ITEM': {
      const existing = state.items.find(
        item => item.product.id === action.payload.id,
      );

      if (existing) {
        return state;
      }

      return {
        items: [
          ...state.items,
          { id: Date.now(), quantity: 1, product: action.payload },
        ],
      };
    }

    //payload = id
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(item => item.id !== action.payload),
      };

    //payload = {id, delta}
    case 'CHANGE_QUANTITY': {
      return {
        items: state.items.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + action.payload.delta),
              }
            : item,
        ),
      };
    }

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem('cart');

    if (stored) {
      try {
        dispatch({ type: 'INIT', payload: JSON.parse(stored) });
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ items: state.items, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
/* eslint-enable @typescript-eslint/indent */
