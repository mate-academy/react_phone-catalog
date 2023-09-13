import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import { addItem, removeItem } from '../utils/cartHelpFunctions';
import { CartItem } from '../types/CartItem';

interface Cart {
  cartItems: CartItem[];
  addItemToCart: (productToAdd: CartItem) => void;
  removeItemFromCart: (cartItemToRemove: CartItem) => void;
  plusItem: (cartItem: CartItem) => void,
  minusItem: (cartItem: CartItem) => void,
  cartCount: number;
  cartTotalPrice: number;
  checkAdded: (id: string) => boolean;
}

export const CartContext = createContext<Cart>({
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  plusItem: () => { },
  minusItem: () => { },
  cartCount: 0,
  cartTotalPrice: 0,
  checkAdded: () => false,
});

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartTotalPrice, setCartTotalPrice] = useState<number>(0);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');

    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0,
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0,
    );

    setCartTotalPrice(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd: CartItem) => {
    setCartItems((prevCartItems) => addItem(prevCartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove: CartItem) => {
    setCartItems(prevCartItems => removeItem(prevCartItems, cartItemToRemove));
  };

  const plusItem = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => prevCartItems.map((item) => (
      item.id === cartItem.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )));
  };

  const minusItem = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => prevCartItems.map((item) => {
      if (item.id === cartItem.id) {
        const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;

        return { ...item, quantity: newQuantity };
      }

      return item;
    }));
  };

  const checkAdded = (id: string) => {
    return cartItems.some(item => item.id === id);
  };

  const value: Cart = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    plusItem,
    minusItem,
    cartCount,
    cartTotalPrice,
    checkAdded,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
