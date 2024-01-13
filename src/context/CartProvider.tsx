import React, {
  createContext,
  useReducer,
  ReactNode,
  useContext,
} from 'react';
import { Product } from '../types/Product';

interface CartAction {
  type: 'ADD_TO_CART' | 'REMOVE_FROM_CART';
  payload: Product;
}

interface CartState {
  cart: Product[];
}

type CartContextType = {
  cart: Product[];
  handleAddToCart: (product: Product) => void;
  handleRemoveFromCart: (product: Product) => void;
};

export const CartContext = createContext<
CartContextType | undefined
>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};

const saveStateToLocalStorage = (cart: Product[]): void => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const CartProvider: React.FC<{
  children: ReactNode,
}> = ({ children }) => {
  const getInitialStateFromLocalStorage = (): CartState => {
    const storedCart = localStorage.getItem('cart');

    return {
      cart: storedCart ? JSON.parse(storedCart) : [],
    };
  };

  const [state, dispatch] = useReducer(
    cartReducer,
    getInitialStateFromLocalStorage(),
  );

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    saveStateToLocalStorage([...state.cart, product]);
  };

  const handleRemoveFromCart = (product: Product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    saveStateToLocalStorage(state.cart.filter(item => item.id !== product.id));
  };

  return (
    <CartContext.Provider value={{
      cart: state.cart,
      handleAddToCart,
      handleRemoveFromCart,
    }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const { cart, handleAddToCart, handleRemoveFromCart } = context;

  const handleAddToCartWithLocalStorage = (product: Product) => {
    handleAddToCart(product);
    saveStateToLocalStorage([...cart, product]);
  };

  const handleRemoveFromCartWithLocalStorage = (product: Product) => {
    handleRemoveFromCart(product);
    saveStateToLocalStorage(cart.filter(item => item.id !== product.id));
  };

  return {
    cart,
    handleAddToCart: handleAddToCartWithLocalStorage,
    handleRemoveFromCart: handleRemoveFromCartWithLocalStorage,
  };
};
