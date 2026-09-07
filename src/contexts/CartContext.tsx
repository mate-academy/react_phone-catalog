import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

const CART_KEY = 'cart';

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: Product['itemId']) => void;
  increaseQuantity: (itemId: Product['itemId']) => void;
  decreaseQuantity: (itemId: Product['itemId']) => void;
  getQuantity: (itemId: Product['itemId']) => number;
  getTotalPrice: () => number;
  isInCart: (itemId: Product['itemId']) => boolean;
  getTotalQuantity: () => number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);

    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const increaseQuantity = (itemId: string) => {
    setCartItems(
      cartItems.map(item =>
        item.product.itemId === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const addToCart = (product: Product) => {
    const existing = cartItems.find(
      item => item.product.itemId === product.itemId,
    );

    if (existing) {
      increaseQuantity(product.itemId);
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.product.itemId !== itemId));
  };

  const decreaseQuantity = (itemId: string) => {
    setCartItems(
      cartItems
        .map(item =>
          item.product.itemId === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const getQuantity = (itemId: string) =>
    cartItems.find(item => item.product.itemId === itemId)?.quantity || 0;

  const isInCart = (itemId: string) =>
    cartItems.some(item => item.product.itemId === itemId);

  const getTotalPrice = () =>
    cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

  const getTotalQuantity = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getQuantity,
        getTotalPrice,
        getTotalQuantity,
        isInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
