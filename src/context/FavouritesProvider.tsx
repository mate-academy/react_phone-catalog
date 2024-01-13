import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from 'react';

import {
  FavouritesAction,
  FavouritesState,
  FavouritesContextType,
  Product,
} from '../types/Product';

const FavouritesContext = createContext<
{ state: FavouritesState; dispatch: Dispatch<FavouritesAction> } | undefined
>(undefined);

const favouritesReducer = (
  state: FavouritesState,
  action: FavouritesAction,
): FavouritesState => {
  switch (action.type) {
    case 'ADD_TO_FAV':
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };
    case 'REMOVE_FROM_FAV':
      return {
        ...state,
        favourites: state.favourites.filter(
          (fav) => fav.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
};

export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const getInitialStateFromLocalStorage = (): FavouritesState => {
    const storedFavourites = localStorage.getItem('favourites');

    return {
      favourites: storedFavourites ? JSON.parse(storedFavourites) : [],
    };
  };

  const [state, dispatch] = useReducer(
    favouritesReducer,
    getInitialStateFromLocalStorage(),
  );

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(state.favourites));
  }, [state.favourites]);

  return (
    <FavouritesContext.Provider
      value={{ state, dispatch }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = (): FavouritesContextType => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }

  const { state, dispatch } = context;

  const handleAddToFav = (product: Product) => {
    dispatch({ type: 'ADD_TO_FAV', payload: product });
  };

  return {
    favourites: state.favourites,
    handleAddToFav,
  };
};
