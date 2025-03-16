import React, { createContext, useContext, useMemo, useState } from 'react';
import { Product } from '../../../type/Product';

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product, isDiscount: boolean) => void;
  removeFromCart: (id: string) => void;
  totalPrice: () => number;
  favourite: Product[];
  toggleFavourite: (product: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [favourite, setFavourite] = useState<Product[]>([]);

  const addToCart = (product: Product, isDiscount: boolean) => {
    if (cart.some(item => item.id === product.id)) {
      return;
    }

    const finalPrice = isDiscount ? product.priceDiscount : product.priceRegular;

    setCart(prev => [...prev, { ...product, finalPrice }]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = () => {
    return cart.reduce((acc, item) => acc + (item.finalPrice || 0), 0);
  }

  const toggleFavourite = (product: Product) => {
    setFavourite(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev.filter(item => item.id !== product.id);
      }
      // const finalPrice = isDiscount ? product.priceDiscount : product.priceRegular;
      return [...prev, product];
      // return [...prev, { ...product, finalPrice }]
    })
  }

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      totalPrice,
      favourite,
      toggleFavourite,
    }),
    [cart, favourite],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  return context;
};
