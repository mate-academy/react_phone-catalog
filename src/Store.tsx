import { getProduct } from './api';
import { Action } from './types/Action';
import { Product } from './types/Product';
import { State } from './types/State';
import React, { createContext, useEffect, useReducer } from 'react';

const initialState: State = {
  isMenuOpen: false,
  products: [],
  brandNewModels: [],
  hotPrices: [],
  phones: [],
  tablets: [],
  accessories: [],
  favourites: [],
  cart: [],
  selectedProduct: null,
  isLoading: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setBrandNewModels':
      return {
        ...state,
        brandNewModels: state.products
          .filter(phone => phone.name.includes('iPhone 14 Pro'))
          .sort((a, b) => b.fullPrice - a.fullPrice),
      };

    case 'setHotPrices':
      return {
        ...state,
        hotPrices: state.products
          .filter(phone => phone.name.includes('iPhone 11 Pro Max'))
          .sort((a, b) => b.price - a.price),
      };

    case 'toggleMenu':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };

    case 'setProducts':
      return {
        ...state,
        products: [...action.payload],
      };

    case 'setPhones':
      return {
        ...state,
        phones: [...action.payload],
      };

    case 'setTablets':
      return {
        ...state,
        tablets: [...action.payload],
      };

    case 'setAccessories':
      return {
        ...state,
        accessories: [...action.payload],
      };

    case 'addToFavourites':
      if (state.favourites.some(item => item.id === action.id)) {
        const filteredFav = state.favourites.filter(
          item => item.id !== action.id,
        );

        localStorage.setItem('favourites', JSON.stringify(filteredFav));

        return {
          ...state,
          favourites: filteredFav,
        };
      } else {
        const newItem = state.products.find(item => item.id === action.id);

        if (!newItem) {
          return state;
        }

        localStorage.setItem(
          'favourites',
          JSON.stringify([...state.favourites, newItem]),
        );

        return {
          ...state,
          favourites: [...state.favourites, newItem],
        };
      }

    case 'setFavourites':
      return {
        ...state,
        favourites: action.payload,
      };

    case 'addToCart':
      if (state.cart.some(item => item.id === action.id)) {
        const filteredCart = state.cart.filter(item => item.id !== action.id);

        localStorage.setItem('cart', JSON.stringify(filteredCart));

        return {
          ...state,
          cart: filteredCart,
        };
      } else {
        const newItem = state.products.find(item => item.id === action.id);

        if (newItem) {
          newItem.amount = 1;
          newItem.totalPrice = newItem.price * newItem.amount;
        }

        if (!newItem) {
          return state;
        }

        localStorage.setItem('cart', JSON.stringify([...state.cart, newItem]));

        return {
          ...state,
          cart: [...state.cart, newItem],
        };
      }

    case 'removeFromCart':
      const filteredCart = state.cart.filter(item => item.id !== action.id);

      localStorage.setItem('cart', JSON.stringify(filteredCart));

      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.id),
      };

    case 'clearCart':
      localStorage.removeItem('cart');

      return {
        ...state,
        cart: [],
      };

    case 'setCart':
      return {
        ...state,
        cart: action.payload,
      };

    case 'plusOneItem':
      const updatedCart = state.cart.map(item => {
        if (item.id === action.id) {
          return {
            ...item,
            amount: item.amount + 1,
            totalPrice: item.price * (item.amount + 1),
          };
        }

        return item;
      });

      return {
        ...state,
        cart: updatedCart,
      };

    case 'minusOneItem':
      const editedCart = state.cart.map(item => {
        if (item.id === action.id) {
          return {
            ...item,
            amount: item.amount - 1,
            totalPrice: item.price * (item.amount - 1),
          };
        }

        return item;
      });

      return {
        ...state,
        cart: editedCart,
      };

    case 'addSelectedProduct':
      return {
        ...state,
        selectedProduct: action.payload,
      };

    case 'setIsLoading':
      return {
        ...state,
        isLoading: action.value,
      };
    default:
      return state;
  }
}

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<(action: Action) => void>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'setIsLoading', value: true });

    getProduct()
      .then((data: Product[]) => {
        dispatch({ type: 'setProducts', payload: data });
        dispatch({ type: 'setBrandNewModels' });
        dispatch({ type: 'setHotPrices' });
      })
      .finally(() => dispatch({ type: 'setIsLoading', value: false }));
  }, []);

  useEffect(() => {
    const cartData = localStorage.getItem('cart');

    if (cartData === null) {
      return;
    }

    try {
      dispatch({ type: 'setCart', payload: JSON.parse(cartData) });
    } catch (error) {
      return;
    }
  }, []);

  useEffect(() => {
    const favData = localStorage.getItem('favourites');

    if (favData === null) {
      return;
    }

    try {
      dispatch({ type: 'setFavourites', payload: JSON.parse(favData) });
    } catch (error) {
      return;
    }
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
