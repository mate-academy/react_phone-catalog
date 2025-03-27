import { Product } from '@/types/Products';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface CartContext {
  cart: Product[];
  favourite: Product[];
  addToCart: (product: Product, isDiscount: boolean) => void;
  removeFromCart: (id: number) => void;
  toggleFavourite: (product: Product, isDiscount: boolean) => void;
  isOpenMenu: boolean;
  setIsOpenMenu: (isOpen: boolean) => void;
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  clearCart: () => void;
}

const CartContext = createContext<CartContext | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [favourite, setFavourite] = useState<Product[]>(() => {
    const storedFavourite = localStorage.getItem('favourite');
    return storedFavourite ? JSON.parse(storedFavourite) : [];
  });

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favourite', JSON.stringify(favourite));
  }, [favourite]);

  const addToCart = (product: Product, isDiscount: boolean) => {
    if (cart.some(item => item.id === product.id)) {
      return;
    }

    const finalPrice = isDiscount ? product.price : product.fullPrice;

    setCart(prev => [...prev, { ...product, finalPrice }]);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const toggleFavourite = (product: Product, isDiscount: boolean) => {
    setFavourite(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev.filter(item => item.id !== product.id)
      }

      // return [...prev, product]
      return [...prev, { ...product, isDiscount }]
    })
  }

  const clearCart = () => {
    setCart([]);
  }

  const value = useMemo(
    () => ({
      cart,
      favourite,
      addToCart,
      removeFromCart,
      toggleFavourite,
      isOpenMenu,
      setIsOpenMenu,
      setCart,
      clearCart,
    }),
    [cart, favourite, isOpenMenu],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  return context;
};
