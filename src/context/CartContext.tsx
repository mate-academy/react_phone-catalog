/* src/context/CartContext.tsx */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '../types/Product';

// Definiujemy, jak wygląda element w koszyku (Produkt + ilość)
export interface CartItem extends Product {
  count: number;
}

// Co nasz Context udostępnia innym?
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  totalCount: number; // Ile w sumie rzeczy jest w koszyku (np. do ikonki w Headerze)
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Stan koszyka. Na start próbujemy wczytać dane z pamięci przeglądarki (localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cartItems');

    return saved ? JSON.parse(saved) : [];
  });

  // Za każdym razem jak zmieni się koszyk, zapisujemy go w localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Funkcja dodawania
  const addToCart = (product: Product) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);

      if (existingItem) {
        // Jeśli produkt już jest, zwiększamy ilość
        return currentItems.map(item =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item,
        );
      } else {
        // Jeśli nie ma, dodajemy nowy z count: 1
        return [...currentItems, { ...product, count: 1 }];
      }
    });
  };

  // Funkcja usuwania (zmniejszania ilości lub całkowitego usunięcia)
  const removeFromCart = (productId: number) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === productId);

      if (existingItem && existingItem.count > 1) {
        // Zmniejszamy ilość o 1
        return currentItems.map(item =>
          item.id === productId ? { ...item, count: item.count - 1 } : item,
        );
      } else {
        // Usuwamy całkowicie
        return currentItems.filter(item => item.id !== productId);
      }
    });
  };

  // Obliczamy sumę wszystkich produktów (do czerwonej kropki przy koszyku)
  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, totalCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Własny Hook, żeby łatwiej używać tego w komponentach
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
