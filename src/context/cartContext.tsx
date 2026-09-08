import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocaleStorage';
import { Gadget } from '../types/Gadget';
import { GetProducts } from '../services/GetProducts';

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
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    GetProducts().then(pr => setProducts(pr));
  }, []);

  const toggleCart = (addedToProduct: Product) => {
    setCart((prev: CartProduct[]) => {
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
        } as CartProduct,
      ];
    });
  };

  const toggleProductPageCart = (addedGadget: Gadget) => {
    setCart((prev: CartProduct[]) => {
      const foundItem = products.find(
        (product: Product) => product.itemId === addedGadget.id,
      );

      if (!foundItem) {
        return prev;
      }

      const isInCart = prev.some(
        cartItem => cartItem.item?.itemId === foundItem?.itemId,
      );

      if (isInCart) {
        return prev.filter(
          cartItem => cartItem.item?.itemId !== foundItem?.itemId,
        );
      }

      return [
        ...prev,
        {
          item: foundItem,
          count: 1,
        } as CartProduct,
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
