import React, { createContext, useContext } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocaleStorage';
import { Gadget } from '../types/Gadget';

export interface CartProduct {
  item: Product;
  count: number;
  gadget: Gadget;
}

type CartContextType = {
  cart: CartProduct[];
  toggleCart: (addedToProduct: Product) => void;
  updateCounter: (id: string, value: string) => void;
  toggleProductPageCart: (addedGadget: Gadget) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useLocalStorage<CartProduct[]>('cart', []);

  const toggleCart = (addedToProduct: Product) => {
    setCart((prev: CartProduct[]) => {
      // prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id],
      const foundItem = prev.find(
        product => product.item.itemId === addedToProduct.itemId,
      );

      if (foundItem) {
        return prev.filter(
          favId => favId.item.itemId !== addedToProduct.itemId,
        );
      }

      return [
        ...prev,
        {
          item: addedToProduct,
          count: 1,
        },
      ];
    });
  };

  const toggleProductPageCart = (addedGadget: Gadget) => {
    setCart((prev: CartProduct[]) => {
      // prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id],
      const foundItem = prev.find(
        product => product.gadget.id === addedGadget.id,
      );

      if (foundItem) {
        return prev.filter(favId => favId.gadget.id !== addedGadget.id);
      }

      return [
        ...prev,
        {
          gadget: addedGadget,
          count: 1,
        },
      ];
    });
  };

  const updateCounter = (id: string, value: string) => {
    if (value === 'add') {
      setCart(prev =>
        prev.map((product: CartProduct) =>
          product.item.itemId === id
            ? { ...product, count: product.count + 1 }
            : product,
        ),
      );
    }

    if (value === 'decrement') {
      setCart(prev =>
        prev.map((product: CartProduct) =>
          product.item.itemId === id
            ? { ...product, count: product.count - 1 }
            : product,
        ),
      );
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, toggleCart, updateCounter, toggleProductPageCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
