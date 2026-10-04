import { cartReducer } from '@/shared/reducers/cartReducer';
import { CartItem } from '@/shared/types/CartItem';
import { Product } from '@/shared/types/Product';
import { createContext, useEffect, useReducer } from 'react';

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalProductsPrice: number;
};

export const CartContext = createContext<CartContextType>(
  {} as CartContextType,
);

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[],
  totalItems: 0,
  totalProductsPrice: 0,
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (product: Product) => {
    dispatch({
      type: 'add',
      product,
    });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({
      type: 'remove',
      itemId,
    });
  };

  const increaseQuantity = (itemId: string) => {
    dispatch({
      type: 'increase',
      itemId,
    });
  };

  const decreaseQuantity = (itemId: string) => {
    dispatch({
      type: 'decrease',
      itemId,
    });
  };

  const clearCart = () => {
    dispatch({ type: 'clear' });
  };

  const totalProductsPrice = state.cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const totalItems = state.cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalProductsPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
