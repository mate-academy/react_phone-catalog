import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { Product } from '../types/Product';

interface CartState {
  products: Product[];
}

const initialState: CartState = {
  products: [],
};

type CartAction =
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'REMOVE_PRODUCT'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'LOAD_CART'; payload: { products: Product[] } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  loading: boolean;
  error: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, { ...action.payload, quantity: 1 }],
      };
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(
          (product: Product) => product.id !== action.payload.id,
        ),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id
            ? { ...product, quantity: action.payload.quantity }
            : product,
        ),
      };
    case 'LOAD_CART':
      return {
        ...state,
        products: action.payload.products,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);

        if (Array.isArray(parsedCart.products)) {
          dispatch({
            type: 'LOAD_CART',
            payload: { products: parsedCart.products },
          });
        }
      } catch {
        setError('Failed to load cart from local storage.');

        localStorage.removeItem('cart');
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch, loading, error }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
