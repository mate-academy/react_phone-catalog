import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { Product } from '../types/Product';
import { CartItemType } from '../types/CartItemType';

const getFromLS = <T,>(key: string, defaultValue: T): T => {
  try {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

type State = {
  favourites: Product[];
  cart: CartItemType[];
};

export type UserAction =
  | { type: 'TOGGLE_FAVOURITE'; payload: Product }
  | { type: 'TOGGLE_IN_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'INCREASE_QUANTITY'; payload: number }
  | { type: 'DECREASE_QUANTITY'; payload: number }
  | { type: 'CLEAR_CART' };

const initialState: State = {
  favourites: getFromLS<Product[]>('favourites', []),
  cart: getFromLS<CartItemType[]>('cart', []),
};

const reducer = (state: State, action: UserAction): State => {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const { payload: product } = action;
      const isFavourite = state.favourites.some(fav => fav.id === product.id);

      if (isFavourite) {
        return {
          ...state,
          favourites: state.favourites.filter(fav => fav.id !== product.id),
        };
      }

      return { ...state, favourites: [...state.favourites, product] };
    }

    case 'TOGGLE_IN_CART': {
      const { payload: productToAdd } = action;
      const isItemInCart = state.cart.some(
        item => item.product.id === productToAdd.id,
      );

      if (isItemInCart) {
        return {
          ...state,
          cart: state.cart.filter(item => item.product.id !== productToAdd.id),
        };
      }

      const newItem: CartItemType = { product: productToAdd, quantity: 1 };

      return { ...state, cart: [...state.cart, newItem] };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      };

    case 'INCREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };

    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item,
        ),
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    default:
      return state;
  }
};

const UserActionsStateContext = createContext<State>(initialState);
const UserActionsDispatchContext = createContext<Dispatch<UserAction>>(
  () => {},
);

type UserActionsProviderProps = {
  children: React.ReactNode;
};

export const UserActionsProvider: React.FC<UserActionsProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(state.favourites));
  }, [state.favourites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <UserActionsStateContext.Provider value={state}>
      <UserActionsDispatchContext.Provider value={dispatch}>
        {children}
      </UserActionsDispatchContext.Provider>
    </UserActionsStateContext.Provider>
  );
};

export const useUserActions = () => useContext(UserActionsStateContext);
export const useUserActionsDispatch = () =>
  useContext(UserActionsDispatchContext);
