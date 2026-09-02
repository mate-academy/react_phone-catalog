import { createContext, useContext, useEffect, useReducer } from 'react';

type FavoritesState = string[];

type FavoritesAction =
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'CLEAR_FAVORITES' };

function favoritesReducer(
  state: FavoritesState,
  action: FavoritesAction,
): FavoritesState {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      return state.includes(action.payload)
        ? state.filter(id => id !== action.payload)
        : [...state, action.payload];

    case 'CLEAR_FAVORITES':
      return [];

    default:
      return state;
  }
}

function loadCartFromStorage(): FavoritesState {
  try {
    const saved = localStorage.getItem('favorites');

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

type FavoritesContextType = {
  favorites: FavoritesState;
  dispatch: React.Dispatch<FavoritesAction>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    [],
    loadCartFromStorage,
  );

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
}
