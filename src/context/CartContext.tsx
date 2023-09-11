/* eslint-disable max-len */
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Product } from '../types/Product';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}

interface Cart {
  cartItems: CartItem[];
  addItemToCart: (productToAdd: CartItem) => void;
  removeItemFromCart: (cartItemToRemove: CartItem) => void;
  plusItem: (cartItem: CartItem) => void,
  minusItem: (cartItem: CartItem) => void,
  cartCount: number;
  cartTotalPrice: number;
}

export const CartContext = createContext<Cart>({
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  plusItem: () => { },
  minusItem: () => { },
  cartCount: 0,
  cartTotalPrice: 0,
});

const addCartItem = (cartItems: CartItem[], productToAdd: CartItem) => {
  const foundId = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id,
  );

  if (foundId) {
    return cartItems;
  }

  return [...cartItems, { ...productToAdd }];
};

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

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
    setCartItems((prevCartItems) => addCartItem(prevCartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove: CartItem) => {
    setCartItems((prevCartItems) => removeCartItem(prevCartItems, cartItemToRemove));
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
        // Перевірка, чи кількість товару більше 1 перед відніманням
        const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;

        return { ...item, quantity: newQuantity };
      }

      return item;
    }));
  };

  const value: Cart = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    plusItem,
    minusItem,
    cartCount,
    cartTotalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
