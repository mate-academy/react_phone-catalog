import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Product } from '../types/ProductType';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface SaveProductsContextType {
  favoriteIds: Product['id'][];
  cartIds: { id: Product['id']; quantity: number }[];
  toggleFavorites: (v: Product['id']) => void;
  isFavorite: (id: Product['id']) => boolean;
  toggleCart: (v: Product['id']) => void;
  isCart: (id: Product['id']) => boolean;
  cartQuantity: (id: Product['id']) => number;
  addCartQuantity: (v: Product['id']) => void;
  removeCartQuantity: (v: Product['id']) => void;
  clearCart: () => void;
}

export const SaveProductsContext = createContext<SaveProductsContextType>({
  favoriteIds: [],
  cartIds: [],
  toggleFavorites: () => {},
  isFavorite: () => false,
  toggleCart: () => {},
  clearCart: () => {},
  isCart: () => false,
  cartQuantity: () => 1,
  addCartQuantity: () => {},
  removeCartQuantity: () => {},
});

type InitialState = Readonly<{
  favoriteIds: Product['id'][];
  cartIds: { id: Product['id']; quantity: number }[];
}>;

type Action =
  | { type: 'TOGGLE_FAVORITE'; payload: Product['id'] }
  | { type: 'ADD_CART_QUANTITY'; payload: Product['id'] }
  | { type: 'REMOVE_CART_QUANTITY'; payload: Product['id'] }
  | {
      type: 'UPDATE_CART_QUANTITY';
      payload: { id: Product['id']; delta: number };
    }
  | { type: 'TOGGLE_CART'; payload: Product['id'] }
  | { type: 'CLEAR_CART' };

function reducer(state: InitialState, action: Action): InitialState {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const existsFavorite = state.favoriteIds.includes(action.payload);

      return {
        ...state,
        favoriteIds: existsFavorite
          ? state.favoriteIds.filter(id => id !== action.payload)
          : [...state.favoriteIds, action.payload],
      };

    case 'TOGGLE_CART':
      const existsCart = state.cartIds.some(unit => unit.id === action.payload);

      return {
        ...state,
        cartIds: existsCart
          ? state.cartIds.filter(unit => unit.id !== action.payload)
          : [...state.cartIds, { id: action.payload, quantity: 1 }],
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cartIds: state.cartIds
          .map(unit =>
            unit.id === action.payload.id
              ? { ...unit, quantity: unit.quantity + action.payload.delta }
              : unit,
          )
          .filter(unit => unit.quantity > 0),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cartIds: [],
      };

    default:
      return state;
  }
}

export const SaveProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoritesItems, setFavoritesItems] = useLocalStorage<Product['id'][]>(
    'favorites',
    [],
  );
  const [cartItems, setCartItems] = useLocalStorage<
    { id: Product['id']; quantity: number }[]
  >('cart', []);
  const [state, dispatch] = useReducer(reducer, {
    favoriteIds: favoritesItems,
    cartIds: cartItems,
  });

  useEffect(() => {
    setCartItems(state.cartIds);
    setFavoritesItems(state.favoriteIds);
  }, [setCartItems, setFavoritesItems, state.cartIds, state.favoriteIds]);

  const value = useMemo(() => {
    const favoritesSet = new Set(state.favoriteIds);

    return {
      favoriteIds: Array.from(state.favoriteIds),
      toggleFavorites: (product: Product['id']) =>
        dispatch({ type: 'TOGGLE_FAVORITE', payload: product }),
      isFavorite: (id: Product['id']) => favoritesSet.has(id),

      cartIds: Array.from(state.cartIds),
      toggleCart: (product: Product['id']) =>
        dispatch({ type: 'TOGGLE_CART', payload: product }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      isCart: (id: Product['id']) => state.cartIds.some(unit => unit.id === id),

      cartQuantity: (id: Product['id']) =>
        state.cartIds.find(unit => unit.id === id)?.quantity ?? 0,

      addCartQuantity: (id: Product['id']) =>
        dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, delta: 1 } }),

      removeCartQuantity: (id: Product['id']) =>
        dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, delta: -1 } }),
    };
  }, [state.cartIds, state.favoriteIds]);

  return (
    <SaveProductsContext.Provider value={value}>
      {children}
    </SaveProductsContext.Provider>
  );
};

export const useSaveProducts = () => {
  const context = useContext(SaveProductsContext);

  if (!context) {
    throw new Error(
      'useSaveProducts must be used within a SaveProductsProvider',
    );
  }

  return context;
};
