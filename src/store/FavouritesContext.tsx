import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { ProdCard } from '../types/Product';
import { addToFavourites } from '../utils/helpers/productHelpers';
import { FavouriteContextType } from '../types/FavouritesContextType';

type Action =
  | { type: 'add'; payload: ProdCard }
  | { type: 'init'; payload: ProdCard[] };

export interface FavState {
  favourite: ProdCard[];
}

const reducer = (state: FavState, action: Action): FavState => {
  switch (action.type) {
    case 'add':
      return {
        favourite: addToFavourites(state.favourite, action.payload),
      };

    case 'init':
      return {
        ...state,
        favourite: action.payload,
      };

    default:
      return state;
  }
};

const initFavState: FavState = {
  favourite: [],
};

export const FavouritesContext =
  React.createContext<FavouriteContextType | null>(null);
export const FavouritesDispatchContext = React.createContext(
  (action: Action) => {
    void action;
  },
);

type Props = {
  children: React.ReactNode;
};

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initFavState);

  useEffect(() => {
    const savedFav = localStorage.getItem('state.favourite');

    if (savedFav) {
      dispatch({
        type: 'init',
        payload: JSON.parse(savedFav),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('state.favourite', JSON.stringify(state.favourite));
  }, [state.favourite]);

  const toggleFav = useCallback((product: ProdCard) => {
    dispatch({ type: 'add', payload: product });
  }, []);

  const value = useMemo(
    () => ({
      state,
      toggleFav,
    }),
    [state, toggleFav],
  );

  return (
    <FavouritesDispatchContext.Provider value={dispatch}>
      <FavouritesContext.Provider value={value}>
        {children}
      </FavouritesContext.Provider>
    </FavouritesDispatchContext.Provider>
  );
};

export const useFavourites = () => {
  const favourite = useContext(FavouritesContext) as FavouriteContextType;

  return favourite;
};
