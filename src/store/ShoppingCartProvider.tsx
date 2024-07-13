import React, { useMemo } from 'react';
import { useLocaleStorage } from '../utils/hooks/useLocalStorage';
import { CartType } from '../types/ContextType/CartType';
import { Product } from '../types/ContextType/Product';

type Props = {
  children: React.ReactNode;
};

type ShoppingCartContextType = {
  getItemsQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  setCartItems: (v: CartType[] | ((s: CartType[]) => CartType[])) => void;
  cartItems: CartType[];
  clearAllFromCart: () => void;
  handleAddToCart: (v: Product) => void;
};

export const ShoppingCartContext = React.createContext(
  {} as ShoppingCartContextType,
);

export const ShoppingCartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useLocaleStorage<CartType[]>('cart', []);

  const getItemsQuantity = (id: number) => {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id: number) => {
    setCartItems(currentItems => {
      if (!currentItems.find(item => item.id === id)) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map(item => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: number) => {
    setCartItems(currentItems => {
      if (currentItems.find(item => item.id === id)?.quantity === 1) {
        return currentItems.filter(item => item.id !== id);
      } else {
        return currentItems.map(item => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const clearAllFromCart = () => {
    setCartItems([]);
  };

  const handleAddToCart = (good: Product) => {
    setCartItems(currentItems => {
      const newItems = [...currentItems];

      if (newItems.find(item => item.id === good.id)) {
        return newItems.filter(item => item.id !== good.id);
      } else {
        return [
          ...newItems,
          {
            id: good.id,
            quantity: 1,
            name: good.name,
            image: good.image,
            price: good.fullPrice,
            category: good.category,
            itemId: good.itemId,
          },
        ];
      }
    });
  };

  const cartItemsTools = useMemo(
    () => ({
      getItemsQuantity,
      increaseCartQuantity,
      decreaseCartQuantity,
      removeFromCart,
      setCartItems,
      cartItems,
      clearAllFromCart,
      handleAddToCart,
    }),
    [cartItems],
  );

  return (
    <ShoppingCartContext.Provider value={cartItemsTools}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
