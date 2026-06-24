import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'cart';

export type CartItem = {
  id: string;
  quantity: number;
};

type Action =
  | { type: 'ADD'; id: string }
  | { type: 'REMOVE'; id: string }
  | { type: 'INCREMENT'; id: string }
  | { type: 'DECREMENT'; id: string }
  | { type: 'CLEAR' };

type CartContextValue = {
  cart: CartItem[];
  isInCart: (id: string) => boolean;
  getTotalQuantity: () => number;
  add: (id: string) => void;
  remove: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const loadFromStorage = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
};

const reducer = (state: CartItem[], action: Action): CartItem[] => {
  switch (action.type) {
    case 'ADD':
      if (state.some(item => item.id === action.id)) {
        return state;
      }

      return [...state, { id: action.id, quantity: 1 }];

    case 'REMOVE':
      return state.filter(item => item.id !== action.id);

    case 'INCREMENT':
      return state.map(item =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item,
      );

    case 'DECREMENT':
      return state.map(item =>
        item.id === action.id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      );

    case 'CLEAR':
      return [];

    default:
      return state;
  }
};

type Props = { children: ReactNode };

export const CartProvider = ({ children }: Props) => {
  const [cart, dispatch] = useReducer(reducer, loadFromStorage());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const isInCart = useCallback(
    (id: string) => cart.some(item => item.id === id),
    [cart],
  );

  const getTotalQuantity = useCallback(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const add = useCallback((id: string) => dispatch({ type: 'ADD', id }), []);

  const remove = useCallback(
    (id: string) => dispatch({ type: 'REMOVE', id }),
    [],
  );

  const increment = useCallback(
    (id: string) => dispatch({ type: 'INCREMENT', id }),
    [],
  );

  const decrement = useCallback(
    (id: string) => dispatch({ type: 'DECREMENT', id }),
    [],
  );

  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const value = useMemo(
    () => ({
      cart,
      isInCart,
      getTotalQuantity,
      add,
      remove,
      increment,
      decrement,
      clear,
    }),
    [
      cart,
      isInCart,
      getTotalQuantity,
      add,
      remove,
      increment,
      decrement,
      clear,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }

  return ctx;
};
