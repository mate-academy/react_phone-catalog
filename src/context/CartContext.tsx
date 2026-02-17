import React, { useEffect, useState } from "react";
import { Product } from "../modules/shared/types/Product";
import { CartItem } from "../modules/shared/types/CartItem";

interface CartContextType {
  cartItems: CartItem[],
  addToCart: (product: Product) => void,
  removeFromCart: (productId: string) => void,
  increment: (productId: string) => void,
  decrement: (productId: string) => void
};

export const CartContext = React.createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increment: () => {},
  decrement: () => {}
});

type Props = {
  children: React.ReactNode
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const STORAGE_CART_KEY = 'cartItems';

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_CART_KEY);

    if (data) {
      setCartItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cartItems))
  }, [cartItems]);

  const addToCart = (cartProduct: Product) => {
    setCartItems(prev => {
      const newCartItem = prev.find((item) => item.product.productId === cartProduct.productId)

      if (newCartItem) {
        return prev.map(item =>
          item.product.productId === cartProduct.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { product: cartProduct, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.productId !== productId))
  }

  const increment = (productId: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.productId === productId
          ? { ...item, quantity: item.quantity + 1}
          : item
      )
    )
  }

  const decrement = (productId: string) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.product.productId !== productId) {
          return item;
        }

        if (item.quantity === 1) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity - 1
        };
      })
    );
  };


  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increment,
    decrement
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )

}


