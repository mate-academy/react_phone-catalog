import React, { ReactNode, useEffect, useState } from 'react';
import { Product } from '../../types/Product';

type CartProps = {
  cartProducts: Product[];
  toggleCartProduct: (arg: Product) => void;
};

const CartContext = React.createContext<CartProps | undefined>(
  undefined,
);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartProducts, setCartProducts] = useState<Product[]>(() => {
    const sortedCart = localStorage.getItem('cart');
    return sortedCart ? JSON.parse(sortedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }, [cartProducts])

  const toggleCartProduct = (product: Product) => {
    setCartProducts(prevCartProducts => {
      const isInCart = prevCartProducts.some(prev => prev.id === product.id);
      
      if (isInCart) {
        return prevCartProducts.filter(cart => cart.id !== product.id);
      }

      return [...prevCartProducts, product];
    })
  }

  return (
      <CartContext.Provider value={{ cartProducts, toggleCartProduct}}>
        {children}
      </CartContext.Provider>
  )
};


export const useCartProducts = () => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error('useCartProducts must be used within a CartContextProvider');
  }

  return context;
}