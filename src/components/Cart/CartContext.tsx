import React, { ReactNode, useEffect, useState } from 'react';
import { Product } from '../../types/Product';

type CartProps = {
  cartProducts: Product[];
  addProductToCart: (arg: Product) => void;
  addQuantity: (arg: Product) => void;
  removeFromCart: (arg: Product) => void;
  clearCart: () => void;
  subtractQuantity: (arg: Product) => void;
};

const CartContext = React.createContext<CartProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartProducts, setCartProducts] = useState<Product[]>(() => {
    const sortedCart = localStorage.getItem('cart');

    return sortedCart ? JSON.parse(sortedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCartProducts([]);
  };

  const addProductToCart = (product: Product) => {
    setCartProducts(prevCartProducts => {
      const isInCart = prevCartProducts.some(prev => prev.id === product.id);

      if (isInCart) {
        return prevCartProducts.filter(cart => cart.id !== product.id);
      }

      return [...prevCartProducts, { ...product, quantity: 1 }];
    });
  };

  const addQuantity = (product: Product) => {
    setCartProducts(prev =>
      prev.map(p =>
        p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p,
      ),
    );
  };

  const subtractQuantity = (product: Product) => {
    setCartProducts(prev =>
      prev.map(p => {
        if (p.quantity && p.id === product.id) {
          return { ...p, quantity: p.quantity - 1 };
        }

        return p;
      }),
    );
  };

  const removeFromCart = (product: Product) => {
    setCartProducts(prev => prev.filter(item => item.id !== product.id));
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addProductToCart,
        addQuantity,
        removeFromCart,
        clearCart,
        subtractQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartProducts = () => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCartProducts must be used within a CartContextProvider',
    );
  }

  return context;
};
