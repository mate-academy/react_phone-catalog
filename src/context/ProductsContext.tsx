import React, { createContext, useContext, useEffect, useState } from 'react';
import { ProductType } from 'models/product.model';

const FAVORITES_KEY = 'favorites';
const CART_KEY = 'cart';

type CartItem = {
  product: ProductType;
  quantity: number;
};

type ProductsContextType = {
  products: ProductType[];
  cart: CartItem[];
  favorites: ProductType[];

  toggleCart: (product: ProductType) => void;
  toggleFav: (product: ProductType) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
};

const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products] = useState<ProductType[]>([]);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(CART_KEY);

    try {
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<ProductType[]>(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);

    try {
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  const toggleCart = (product: ProductType) => {
    setCart(prev => {
      const exists = prev.some(item => item.product.id === product.id);

      if (exists) {
        return prev.filter(item => item.product.id !== product.id);
      }

      return [
        ...prev,
        {
          product,
          quantity: 1,
        },
      ];
    });
  };

  const toggleFav = (product: ProductType) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === product.id);

      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }

      return [...prev, product];
    });
  };

  const increaseQuantity = (productId: number) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [favorites, cart]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        cart,
        favorites,
        toggleCart,
        toggleFav,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// custom hooks
export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }

  return context;
};
