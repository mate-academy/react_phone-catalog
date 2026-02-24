import React, { useEffect } from 'react';
import { Product } from '../types/itemTypes';

type CartContextType = {
  cart: CartRecord;
  setCart: React.Dispatch<React.SetStateAction<CartRecord>>;
  handleAddToCart: (product: Product) => void;
  handleSubtractProduct: (productId: number) => void;
  handleDeleteProduct: (productId: number) => void;
};

export type CartProduct = {
  product: Product;
  quantity: number;
};

type CartRecord = Record<string, CartProduct>;

export const CartContext = React.createContext<CartContextType>({
  cart: {},
  setCart: () => {},
  handleAddToCart: () => {},
  handleSubtractProduct: () => {},
  handleDeleteProduct: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = React.useState<CartRecord>(() => {
    const storedCart = localStorage.getItem('cart');

    return storedCart ? JSON.parse(storedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingProduct = prevCart[product.id];

      if (existingProduct) {
        return {
          ...prevCart,
          [product.id]: {
            ...existingProduct,
            quantity: existingProduct.quantity + 1,
          },
        };
      }

      return {
        ...prevCart,
        [product.id]: { product, quantity: 1 },
      };
    });
  };

  const handleDeleteProduct = (productId: number) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };

      delete updatedCart[productId];

      return updatedCart;
    });
  };

  const handleSubtractProduct = (productId: number) => {
    setCart(prevCart => {
      const existingProduct = prevCart[productId];

      if (existingProduct && existingProduct.quantity > 1) {
        return {
          ...prevCart,
          [productId]: {
            ...existingProduct,
            quantity: existingProduct.quantity - 1,
          },
        };
      }

      if (existingProduct && existingProduct.quantity === 1) {
        handleDeleteProduct(productId);
      }

      return prevCart;
    });
  };

  const ctxValue = {
    cart,
    setCart,
    handleAddToCart,
    handleSubtractProduct,
    handleDeleteProduct,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};
