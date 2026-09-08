import React, { createContext, useState, ReactNode } from 'react';
import {
  CartContextType,
  CartItem,
  FavoritesContextType,
  Product,
} from './types';

// Типы данных для корзины и избранного

// Создаём контексты с дефолтными значениями
export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

// Тип для провайдера
interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Состояние корзины
  const [cart, setCart] = useState<CartItem[]>([]);

  // Состояние избранного
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Функции для управления корзиной
  const cartInclude = (product: Product | null): boolean | null => {
    return cart.some(item => item.product.id === product?.id) || null;
  };

  const favoritesInclude = (product: Product): boolean => {
    return favorites.some(item => item.id === product?.id);
  };

  const deleteFromCart = (product: Product) => {
    setCart(prev => prev.filter(item => item.product.id !== product.id));
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      // Копируем предыдущее состояние
      const updatedCart = [...prev];
      const index = updatedCart.findIndex(
        item => item.product.id === product.id,
      );

      if (index !== -1) {
        // Если товар уже есть, увеличиваем количество
        updatedCart[index] = {
          ...updatedCart[index],
          quantity: updatedCart[index].quantity + 1,
        };
      } else {
        // Если товара нет, добавляем новый
        updatedCart.push({ product, quantity: 1 });
      }

      return updatedCart; // Возвращаем обновлённый массив
    });
  };

  const removeFromCart = (product: Product) => {
    setCart(prev => {
      const updatedCart = [...prev];
      const index = updatedCart.findIndex(
        item => item.product.id === product.id,
      );

      if (index !== -1) {
        if (updatedCart[index].quantity > 1) {
          updatedCart[index] = {
            ...updatedCart[index],
            quantity: updatedCart[index].quantity - 1,
          };
        } else {
          updatedCart.splice(index, 1);
        }
      }

      return updatedCart; // Возвращаем обновлённый массив
    });
  };

  // Функции для управления избранным
  const addToFavorites = (product: Product) =>
    setFavorites(prev => [...prev, product]);
  const removeFromFavorites = (productId: string) =>
    setFavorites(prev => prev.filter(item => item.id !== productId));

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, cartInclude, deleteFromCart }}
    >
      <FavoritesContext.Provider
        value={{
          favorites,
          addToFavorites,
          removeFromFavorites,
          favoritesInclude,
        }}
      >
        {children}
      </FavoritesContext.Provider>
    </CartContext.Provider>
  );
};

export default AppProvider;
