import {
  ReactNode, createContext, useContext, useEffect, useReducer,
} from 'react';
import { FetchedProduct } from '../helpers/types/FetchedProduct';
import { Product } from '../helpers/types/Product';

export type CartItemWithQuantity = (FetchedProduct & { quantity: number })
| (Product & { quantity: number });

type ContextState = {
  cart: CartItemWithQuantity[];
  favorites: FetchedProduct[];
};

type Action =
  | { type: 'ADD_TO_CART'; payload: FetchedProduct }
  | { type: 'REMOVE_FROM_CART'; payload: FetchedProduct['id'] }
  | { type: 'INCREMENT_QUANTITY'; payload: FetchedProduct['id'] }
  | { type: 'DECREMENT_QUANTITY'; payload: FetchedProduct['id'] }
  | { type: 'ADD_TO_FAVORITES'; payload: FetchedProduct }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: FetchedProduct['id'] };

const initialState = {
  cart: [],
  favorites: [],
};

const CartFavoritesContext = createContext<{
  state: ContextState;
  addToCart:(item: FetchedProduct) => void;
  removeFromCart: (itemId: FetchedProduct['id']) => void;
  incrementQuantity: (itemId: FetchedProduct['id']) => void;
  decrementQuantity: (itemId: FetchedProduct['id']) => void;
  addToFavorites: (item: FetchedProduct) => void;
  removeFromFavorites: (itemId: FetchedProduct['id']) => void;
}>({
      state: initialState,
      addToCart: () => { },
      removeFromCart: () => { },
      incrementQuantity: () => { },
      decrementQuantity: () => { },
      addToFavorites: () => { },
      removeFromFavorites: () => { },
    });

export const useCartFavorites = () => {
  const context = useContext(CartFavoritesContext);

  if (!context) {
    // eslint-disable-next-line max-len
    throw new Error('useCartFavorites must be used within a CartFavoritesProvider');
  }

  return context;
};

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

const reducer = (state: ContextState, action: Action): ContextState => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case INCREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) => (
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )),
      };

    case DECREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) => (
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )),
      };
    case ADD_TO_FAVORITES:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

const STORAGE_KEY = 'cartFavoritesState';

export const CartFavoritesProvider = ({ children }:
{ children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState,
    (initialStateFromReducer) => {
      const storedState = localStorage.getItem(STORAGE_KEY);

      return storedState ? JSON.parse(storedState) : initialStateFromReducer;
    });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addToCart = (item: FetchedProduct) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  const removeFromCart = (itemId: FetchedProduct['id']) => {
    dispatch({ type: REMOVE_FROM_CART, payload: itemId });
  };

  const incrementQuantity = (itemId: FetchedProduct['id']) => {
    dispatch({ type: INCREMENT_QUANTITY, payload: itemId });
  };

  const decrementQuantity = (itemId: FetchedProduct['id']) => {
    dispatch({ type: DECREMENT_QUANTITY, payload: itemId });
  };

  const addToFavorites = (item: FetchedProduct) => {
    dispatch({ type: ADD_TO_FAVORITES, payload: item });
  };

  const removeFromFavorites = (itemId: FetchedProduct['id']) => {
    dispatch({ type: REMOVE_FROM_FAVORITES, payload: itemId });
  };

  return (
    <CartFavoritesContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </CartFavoritesContext.Provider>
  );
};
