import React, { useEffect, useReducer } from 'react';
import { Product } from 'src/types/Product';

interface State {
  items: Product[];
}

type Action =
  | { type: 'add'; payload: Product }
  | { type: 'remove'; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      return {
        items: [...state.items, action.payload],
      };

    case 'remove':
      return {
        items: state.items.filter(p => p.itemId !== action.payload),
      };

    default:
      return state;
  }
}

export const FavouritesContext = React.createContext<{
  items: Product[];
  toggle: (product: Product) => void;
  isFavourite: (itemId: string) => boolean;
} | null>(null);

type Props = {
  children: React.ReactNode;
};

const initialState: State = {
  items: [],
};

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [{ items }, dispatch] = useReducer(reducer, initialState, () => {
    const saved = localStorage.getItem('favourites');

    return saved ? { items: JSON.parse(saved) } : { items: [] };
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(items));
  }, [items]);

  const toggle = (product: Product) => {
    const exists = items.some(item => item.itemId === product.itemId);

    if (exists) {
      dispatch({ type: 'remove', payload: product.itemId });
    } else {
      dispatch({ type: 'add', payload: product });
    }
  };

  const isFavourite = (itemId: string) =>
    items.some(item => item.itemId === itemId);

  return (
    <FavouritesContext.Provider value={{ items, toggle, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = React.useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavourites must be used within FavouritesProvider');
  }

  return context;
};
