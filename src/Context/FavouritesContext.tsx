/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {
  FavState,
  FavAction,
  FavContextType,
  FavItem,
} from '../types/ContextFavourites';
import { Products } from '../types/Products';

type Props = React.PropsWithChildren<{ someFlag?: boolean }>;

const STORAGE_KEY = 'favourites';

const normalizeImagePath = (src: string) => src.replace(/rimg\//g, 'img/');

const normalizeProduct = (product: Products): Products =>
  product.image
    ? { ...product, image: normalizeImagePath(product.image) }
    : product;

function readFav(): FavState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return { items: [] };
    }

    const parsed = JSON.parse(raw);

    if (!parsed || !Array.isArray(parsed.items)) {
      return { items: [] };
    }

    return {
      items: parsed.items.map((item: FavItem) => ({
        ...item,
        product: normalizeProduct(item.product),
      })),
    };
  } catch {
    return { items: [] };
  }
}

function FavReducer(state: FavState, action: FavAction): FavState {
  switch (action.type) {
    case 'ADD': {
      const payload = action.payload as Products;
      const id = String(payload.id);
      const exists = state.items.find(i => i.id === id);

      if (exists) {
        return state;
      }

      return {
        ...state,
        items: [...state.items, { id, product: payload, quantity: 1 }],
      };
    }

    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload),
      };

    case 'CLEAR':
      return { items: [] };

    case 'TOGGLE': {
      if (state.items.some(i => i.id === action.payload)) {
        return { items: state.items.filter(i => i.id !== action.payload) };
      }

      return state;
    }

    default:
      return state;
  }
}

const FavContext = createContext<FavContextType | null>(null);

export const FavProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(FavReducer, readFav());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);
  const addToFav = useCallback(
    (product: Products) => {
      dispatch({ type: 'ADD', payload: product });
    },
    [dispatch],
  );
  const removeFromFav = useCallback(
    (id: string) => {
      dispatch({ type: 'REMOVE', payload: id });
    },
    [dispatch],
  );
  const isInFav = useCallback(
    (id: string | number) => {
      const nid = typeof id === 'number' ? String(id) : id;

      return state.items.some(i => i.id === nid);
    },
    [state.items],
  );
  const clearFav = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, [dispatch]);
  const totalFavourites = state.items.reduce(
    (s: number, it: FavItem) => s + it.quantity,
    0,
  );

  const value: FavContextType = {
    items: state.items,
    addToFav,
    removeFromFav,
    clearFav,
    isInFav,
    totalFavourites,
  };

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
};

export function useFav() {
  const ctx = useContext(FavContext);

  if (!ctx) {
    throw new Error('useFav must be used inside FavProvider');
  }

  return ctx;
}
