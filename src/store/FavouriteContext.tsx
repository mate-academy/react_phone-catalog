import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { FavouriteContextValue, FavouriteState } from '../types/ContextValues';
import { Product } from '../types/Product';

type Action =
  | { type: 'addToFavourite'; payload: Product }
  | { type: 'removeFromFavourite'; payload: number };

function reducer(state: FavouriteState, action: Action): FavouriteState {
  switch (action.type) {
    case 'addToFavourite':
      const existingProduct = state.find(
        product => product.product.id === action.payload.id,
      );

      return !existingProduct
        ? [...state, { product: action.payload }]
        : [...state];

    case 'removeFromFavourite':
      return state.filter(item => item.product.id !== action.payload);
    default:
      return state;
  }
}

const keyIsPresent = localStorage.getItem('favourite');
let initialValue = [];

if (keyIsPresent) {
  try {
    initialValue = JSON.parse(keyIsPresent);
  } catch (e) {
    throw new Error('Invalid JSON data in localStorage for "cart"');
  }
}

export const FavouriteContext =
  createContext<FavouriteContextValue>(initialValue);

type Props = {
  children: React.ReactNode;
};

export const FavouriteProvider: React.FC<Props> = ({ children }) => {
  const [favourites, dispatch] = useReducer(reducer, initialValue);

  const addToFavourite = useCallback((product: Product) => {
    dispatch({ type: 'addToFavourite', payload: product });
  }, []);

  const removeFromFavourite = useCallback((product: Product) => {
    dispatch({ type: 'removeFromFavourite', payload: product.id });
  }, []);

  const favouritesCount = favourites.length;

  useEffect(() => {
    localStorage.setItem('favourite', JSON.stringify(favourites));
  }, [favourites]);

  const favouriteValues = useMemo(
    () => ({
      favourites,
      favouritesCount,
      addToFavourite,
      removeFromFavourite,
    }),
    [favourites, favouritesCount, addToFavourite, removeFromFavourite],
  );

  return (
    <FavouriteContext.Provider value={favouriteValues}>
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavouriteValues = () => {
  const value = useContext(FavouriteContext);

  if (!value) {
    throw new Error('Something is wrong with provider FavouriteContext');
  }

  return value;
};
