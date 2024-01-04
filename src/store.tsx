import {
  createContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Product } from './types/Product';
import { getProducts } from './api/api';

type Action = { type: 'SET_PRODUCTS', payload: Product[] }
| { type: 'START_LOADER' }
| { type: 'STOP_LOADER' }
| { type: 'SET_FAVOURITE', payload: Product }
| { type: 'ADD_TO_CART', payload: CartItemType }
| { type: 'DELETE_PRODUCT', payload: CartItemType }
| { type: 'UPDATE_AMOUNT', payload: CartItemType[] }
| { type: 'DELETE_FROM_CART', payload: CartItemType };

export type CartItemType = {
  id: string,
  category: string,
  phoneId: string,
  itemId: string,
  name: string,
  fullPrice: number,
  price: number,
  screen: string,
  capacity: string,
  color: string,
  ram: string,
  year: number,
  image: string,
  amount: number,
};

const reducer = (
  state: GlobalContextType,
  action: Action,
): GlobalContextType => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };

    case 'START_LOADER':
      return { ...state, isLoading: true };

    case 'STOP_LOADER':
      return { ...state, isLoading: false };

    case 'SET_FAVOURITE':
      return {
        ...state,
        favourites: state.favourites.some(fav => fav.id === action.payload.id)
          ? state.favourites.filter(fav => fav.id !== action.payload.id)
          : [...state.favourites, action.payload],
      };

    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case 'DELETE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };

    case 'UPDATE_AMOUNT':
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};

type GlobalContextType = {
  products: Product[],
  favourites: Product[],
  cart: CartItemType[],
  isLoading: boolean,
  dispatch: React.Dispatch<Action>,
};

export const GlobalContext = createContext<GlobalContextType>({
  products: [],
  favourites: [],
  cart: [],
  isLoading: false,
  dispatch: () => {},
});

interface Props {
  children: React.ReactNode
}

const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');

const initialState: GlobalContextType = {
  products: [],
  favourites: storedFavourites,
  cart: storedCart,
  isLoading: false,
  dispatch: () => {},
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    products,
    isLoading,
    favourites,
    cart,
  } = state;

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const value = useMemo(() => ({
    products,
    favourites,
    cart,
    isLoading,
    dispatch,
  }), [products, favourites, cart, isLoading, dispatch]);

  useEffect(() => {
    dispatch({ type: 'START_LOADER' });
    getProducts()
      .then(data => dispatch({ type: 'SET_PRODUCTS', payload: data }))
      .finally(() => dispatch({ type: 'STOP_LOADER' }));
  }, []);

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
