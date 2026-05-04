/* eslint-disable @typescript-eslint/no-unused-vars */
import {
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
} from '../types/ContextFavourites';
import { Products } from '../types/Products';

type Props = { someFlag?: boolean } & React.PropsWithChildren<{}>;

const STORAGE_KEY = 'favourites';

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

    return { items: parsed.items }; // optionally normalize ids here
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
    default:
      return state;

    case 'TOGGLE': {
      if (state.items.some(i => i.id === action.payload)) {
        return { items: state.items.filter(i => i.id !== action.payload) };
      }

      return state;
    }
    // you’ll need product to add — toggle by id only works if you have cached product
  }
}

const FavContext = createContext<FavContextType | null>(null);

export const FavProvider = ({ children }: Props) => {
  const init = (_arg: undefined): FavState => readFav();
  const [state, dispatch] = useReducer<React.Reducer<FavState, FavAction>>(
    FavReducer,
    undefined,
    init,
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);
  const addToFav = useCallback(
    (product: Products) => {
      (dispatch as React.Dispatch<FavAction>)({
        type: 'ADD',
        payload: product,
      });
    },
    [dispatch],
  );
  const removeFromFav = useCallback(
    (id: string) => {
      (dispatch as React.Dispatch<FavAction>)({ type: 'REMOVE', payload: id });
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
    (dispatch as React.Dispatch<FavAction>)({ type: 'CLEAR' });
  }, [dispatch]);
  const value: FavContextType = {
    items: state.items,
    addToFav,
    removeFromFav,
    clearFav,
    isInFav,
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
