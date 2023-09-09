/* eslint-disable max-len */
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

interface ProductItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  // isCartOpen: boolean;
  // setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: ProductItem[];
  addItemToCart: (productToAdd: ProductItem) => void;
  removeItemFromCart: (cartItemToRemove: ProductItem) => void;
  clearItemFromCart: (cartItemToClear: ProductItem) => void;
  cartCount: number;
  cartTotal: number;
}

export const CartContext = createContext<CartContextType>({
  // isCartOpen: false,
  // setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  clearItemFromCart: () => { },
  cartCount: 0,
  cartTotal: 0,
});

// Допоміжні функції
// чи є в кошику такий самий продукт
const addCartItem = (cartItems: ProductItem[], productToAdd: ProductItem) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id,
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) => (
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    ));
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: ProductItem[], cartItemToRemove: ProductItem) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id,
  );

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) => (
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  ));
};

const clearCartItem = (cartItems: ProductItem[], cartItemToClear: ProductItem) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ProductItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);

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

    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd: ProductItem) => {
    setCartItems((prevCartItems) => addCartItem(prevCartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove: ProductItem) => {
    setCartItems((prevCartItems) => removeCartItem(prevCartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear: ProductItem) => {
    setCartItems((prevCartItems) => clearCartItem(prevCartItems, cartItemToClear));
  };

  const value: CartContextType = {
    // isCartOpen,
    // setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
