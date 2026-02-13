import React, { createContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';

export interface CartProduct extends Product {
  quantity: number;
}

interface CartContextType {
  cartProducts: CartProduct[];
  addCartProduct: (value: Product) => void;
  removeCartProduct: (elementId: string) => void;
  changeQuantity: (elementId: string, action: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartProducts: [],
  addCartProduct: () => {},
  removeCartProduct: () => {},
  changeQuantity: () => {},
  clearCart: () => {},
});

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    const savedCartProducts = localStorage.getItem('cartProducts');

    if (savedCartProducts) {
      setCartProducts(JSON.parse(savedCartProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const addCartProduct = (value: Product) => {
    setCartProducts(prevCartProducts => {
      return [...prevCartProducts, { ...value, quantity: 1 }];
    });
  };

  const removeCartProduct = (elementId: string) => {
    setCartProducts(prevCartProducts => {
      return prevCartProducts.filter(product => product.itemId !== elementId);
    });
  };

  const changeQuantity = (elementId: string, action: string) => {
    setCartProducts(prevCartProducts => {
      return prevCartProducts.map(product => {
        if (product.itemId === elementId) {
          let amount = product.quantity;

          switch (action) {
            case 'increment':
              amount++;
              break;

            case 'decrement':
              amount--;
              break;
          }

          return { ...product, quantity: amount };
        }

        return product;
      });
    });
  };

  const clearCart = () => {
    setCartProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addCartProduct,
        removeCartProduct,
        changeQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
