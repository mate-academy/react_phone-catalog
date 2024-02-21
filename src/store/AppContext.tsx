import {
  ReactNode,
  createContext,
  useReducer,
  useContext,
  useEffect,
} from 'react';
import { PhoneDetails } from '../types/PhoneDetails';
import { Product } from '../types/Product';

export type CartItem = (Product & { quantity: number });

export type Products = (Product | PhoneDetails);

type AppState = {
  cart: CartItem[],
  favourites: Product[],
};

const initialState: AppState = {
  cart: [],
  favourites: [],
};

type AppContextValue = {
  state: AppState,
  addToCart: (item: Product) => void,
  removeFromCart: (itemId: Product['id']) => void,
  increaseQuantity: (itemId: Product['id']) => void,
  decreaseQuantity: (itemId: Product['id']) => void,
  addToFavourites: (item: Product) => void,
  removeFromFavourites: (itemId: Product['id']) => void,
};

const AppContext = createContext<AppContextValue>({
  state: initialState,
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  addToFavourites: () => {},
  removeFromFavourites: () => {},
});

export function useAppContext() {
  const appCtx = useContext(AppContext);

  if (appCtx === null) {
    throw new Error('TimersContext is null - that should not be the case!');
  }

  return appCtx;
}

enum Actions {
  AddToCart = 'ADD_TO_CART',
  RemoveFromCart = 'REMOVE_FROM_CART',
  IncreaseQuantity = 'INCREASE_QUANTITY',
  DecreaseQuantity = 'DESCREASE_QUANTITY',
  AddToFavourites = 'ADD_TO_FAVOURITES',
  RemoveFromFavourites = 'REMOVE_FROM_FAVOURITES',
}

type Action = { type: Actions.AddToCart, payload: Product }
| { type: Actions.RemoveFromCart, payload: Product['id'] }
| { type: Actions.IncreaseQuantity, payload: Product['id'] }
| { type: Actions.DecreaseQuantity, payload: Product['id'] }
| { type: Actions.AddToFavourites, payload: Product }
| { type: Actions.RemoveFromFavourites, payload: Product['id'] };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case Actions.AddToCart:
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    case Actions.RemoveFromCart:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case Actions.IncreaseQuantity:
      return {
        ...state,
        cart: state.cart.map((item) => (
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )),
      };
    case Actions.DecreaseQuantity:
      return {
        ...state,
        cart: state.cart.map((item) => (
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )),
      };
    case Actions.AddToFavourites:
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };
    case Actions.RemoveFromFavourites:
      return {
        ...state,
        favourites: state.favourites
          .filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
}

type AppContextProviderProps = {
  children: ReactNode;
};

const LOCAL_STORAGE_KEY = 'LOCAL_STATE';

export const initializer = (initialStateFromReducer: AppState) => {
  const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);

  return storedState ? JSON.parse(storedState) : initialStateFromReducer;
};

export function AppContextProvider({ children } : AppContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState, initializer);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const ctx = {
    state,
    addToCart(item: Product) {
      dispatch({ type: Actions.AddToCart, payload: item });
    },
    removeFromCart(itemId: Product['id']) {
      dispatch({ type: Actions.RemoveFromCart, payload: itemId });
    },
    increaseQuantity(itemId: Product['id']) {
      dispatch({ type: Actions.IncreaseQuantity, payload: itemId });
    },
    decreaseQuantity(itemId: Product['id']) {
      dispatch({ type: Actions.DecreaseQuantity, payload: itemId });
    },
    addToFavourites(item: Product) {
      dispatch({ type: Actions.AddToFavourites, payload: item });
    },
    removeFromFavourites(itemId: Product['id']) {
      dispatch({ type: Actions.RemoveFromFavourites, payload: itemId });
    },
  };

  return (
    <AppContext.Provider value={ctx}>
      {children}
    </AppContext.Provider>
  );
}
