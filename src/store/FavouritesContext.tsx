import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { Product } from '../types/Product';

interface FavouritesState {
  products: Product[];
}

const initialState: FavouritesState = {
  products: [],
};

type FavouritesAction =
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'REMOVE_PRODUCT'; payload: { id: number } }
  | { type: 'LOAD_FAVOURITES'; payload: { products: Product[] } };

interface FavouritesContextType {
  state: FavouritesState;
  dispatch: React.Dispatch<FavouritesAction>;
  loading: boolean;
  error: string;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined,
);

const favouritesReducer = (
  state: FavouritesState,
  action: FavouritesAction,
): FavouritesState => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, { ...action.payload }],
      };
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.payload.id,
        ),
      };
    case 'LOAD_FAVOURITES':
      return {
        ...state,
        products: action.payload.products,
      };
    default:
      return state;
  }
};

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(favouritesReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const storedFavourites = localStorage.getItem('favourites');

    if (storedFavourites) {
      try {
        const parsedFavourites = JSON.parse(storedFavourites);

        if (Array.isArray(parsedFavourites.products)) {
          dispatch({
            type: 'LOAD_FAVOURITES',
            payload: { products: parsedFavourites.products },
          });
        }
      } catch {
        setError('Failed to load cart from local storage.');

        localStorage.removeItem('favourites');
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(state));
  }, [state]);

  return (
    <FavouritesContext.Provider value={{ state, dispatch, loading, error }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (context === undefined) {
    throw new Error('useFavourites must be used within a CartProvider');
  }

  return context;
};
