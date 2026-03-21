/* eslint-disable */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types/Product';
import { ProductDetail } from '@/types/ProductDetail';

// 1. Definicja elementu koszyka
export interface CartItem {
  itemId: string;
  quantity: number;
  product: Product;
}

// 2. Definicja interfejsu kontekstu
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Odczyt z localStorage na starcie
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');

    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Zapis do localStorage przy każdej zmianie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Product | ProductDetail) => {
    setCartItems((prev: CartItem[]) => {
      const itemId = 'itemId' in item ? item.itemId : item.id;

      if (prev.find(prevItem => prevItem.itemId === itemId)) {
        return prev;
      }

      // Mapujemy dane do spójnego formatu Product
      const productData: Product =
        'itemId' in item
          ? item
          : {
              id: Number(item.id.split('-')[0]) || 0,
              category: item.category,
              itemId: item.id,
              name: item.name,
              fullPrice: item.priceRegular,
              price: item.priceDiscount,
              screen: item.screen,
              capacity: item.capacity,
              color: item.color,
              ram: item.ram,
              year: 2022,
              image: item.images[0],
            };

      // Tworzymy nowy obiekt CartItem
      const newItem: CartItem = {
        itemId: itemId,
        quantity: 1,
        product: productData,
      };

      return [...prev, newItem];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.itemId !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.itemId === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalQuantity,
        totalAmount,
      }}
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
