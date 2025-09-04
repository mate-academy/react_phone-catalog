import React, { useContext, useMemo, useReducer, useEffect } from 'react';
import { Product } from '../types/Product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface State {
  favCount: number;
  favorites: Product[];
  cart: CartItem[];
  totalPrice: number;
  cartCount: number;
}

type Action =
  | { type: 'TOGGLE_FAV'; payload: Product }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'INCREASE_QUANTITY'; payload: string }
  | { type: 'DECREASE_QUANTITY'; payload: string }
  | { type: 'CLEAR_CART' };

const calculateTotals = (cart: CartItem[]) => {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.fullPrice * item.quantity,
    0,
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return { totalPrice, cartCount };
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'TOGGLE_FAV':
      const product = action.payload;
      const isFav = state.favorites.some(fav => fav.id === product.id);
      let newFavorites;

      if (isFav) {
        newFavorites = state.favorites.filter(fav => fav.id !== product.id);
      } else {
        newFavorites = [...state.favorites, product];
      }

      return {
        ...state,
        favorites: newFavorites,
        favCount: newFavorites.length,
      };

    case 'ADD_TO_CART':
      const productToAdd = action.payload;
      const existingCartItem = state.cart.find(
        item => item.product.id === productToAdd.id,
      );

      let updatedCart;

      if (existingCartItem) {
        updatedCart = state.cart.map(item =>
          item.product.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        updatedCart = [...state.cart, { product: productToAdd, quantity: 1 }];
      }

      const { totalPrice: newTotalPrice, cartCount: newCartCount } =
        calculateTotals(updatedCart);

      return {
        ...state,
        cart: updatedCart,
        totalPrice: newTotalPrice,
        cartCount: newCartCount,
      };

    case 'REMOVE_FROM_CART':
      const idToRemove = action.payload;
      const filteredCart = state.cart.filter(
        item => item.product.id !== idToRemove,
      );
      const { totalPrice: filteredTotalPrice, cartCount: filteredCartCount } =
        calculateTotals(filteredCart);

      return {
        ...state,
        cart: filteredCart,
        totalPrice: filteredTotalPrice,
        cartCount: filteredCartCount,
      };

    case 'INCREASE_QUANTITY':
      const idToIncrease = action.payload;
      const increasedCart = state.cart.map(item =>
        item.product.id === idToIncrease
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      const { totalPrice: increasedTotalPrice, cartCount: increasedCartCount } =
        calculateTotals(increasedCart);

      return {
        ...state,
        cart: increasedCart,
        totalPrice: increasedTotalPrice,
        cartCount: increasedCartCount,
      };

    case 'DECREASE_QUANTITY':
      const idToDecrease = action.payload;
      const decreasedCart = state.cart.map(item =>
        item.product.id === idToDecrease && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
      const { totalPrice: decreasedTotalPrice, cartCount: decreasedCartCount } =
        calculateTotals(decreasedCart);

      return {
        ...state,
        cart: decreasedCart,
        totalPrice: decreasedTotalPrice,
        cartCount: decreasedCartCount,
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
        totalPrice: 0,
        cartCount: 0,
      };

    default:
      return state;
  }
}

const getInitialState = () => {
  const storedState = localStorage.getItem('cartState');

  if (storedState) {
    const parsedState = JSON.parse(storedState);

    const cart = Array.isArray(parsedState.cart) ? parsedState.cart : [];

    const { totalPrice, cartCount } = calculateTotals(cart);

    return { ...parsedState, cart, totalPrice, cartCount };
  }

  return { favCount: 0, favorites: [], cart: [], totalPrice: 0, cartCount: 0 };
};

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext<State>(getInitialState());
export const DispatchContext = React.createContext((action: Action) => {});

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, null, getInitialState);

  useEffect(() => {
    localStorage.setItem('cartState', JSON.stringify(state));
  }, [state]);

  const stateValue = useMemo(() => state, [state]);
  const dispatchValue = useMemo(() => dispatch, [dispatch]);

  return (
    <DispatchContext.Provider value={dispatchValue}>
      <StateContext.Provider value={stateValue}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useCartState = () => useContext(StateContext);
export const useCartDispatch = () => useContext(DispatchContext);
