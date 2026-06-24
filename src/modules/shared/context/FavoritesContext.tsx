import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'favorites';

type Action =
  | { type: 'ADD'; id: string }
  | { type: 'REMOVE'; id: string }
  | { type: 'TOGGLE'; id: string };

type FavoritesContextValue = {
  favorites: string[];
  favoritesCount: number;
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const loadFromStorage = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

const reducer = (state: string[], action: Action): string[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.id];
    case 'REMOVE':
      return state.filter(id => id !== action.id);
    case 'TOGGLE':
      return state.includes(action.id)
        ? state.filter(id => id !== action.id)
        : [...state, action.id];
    default:
      return state;
  }
};

type Props = { children: ReactNode };

export const FavoritesProvider = ({ children }: Props) => {
  const [favorites, dispatch] = useReducer(reducer, loadFromStorage());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  const toggle = useCallback(
    (id: string) => dispatch({ type: 'TOGGLE', id }),
    [],
  );

  const add = useCallback((id: string) => dispatch({ type: 'ADD', id }), []);

  const remove = useCallback(
    (id: string) => dispatch({ type: 'REMOVE', id }),
    [],
  );

  const value = useMemo(
    () => ({
      favorites,
      favoritesCount: favorites.length,
      isFavorite,
      toggle,
      add,
      remove,
    }),
    [favorites, isFavorite, toggle, add, remove],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextValue => {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return ctx;
};
