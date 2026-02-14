import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllProducts } from '../utils/api';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type CartItem = Product & { quantity: number };

type GlobalContextType = {
  allProducts: Product[];
  hotPrices: Product[];
  brandNew: Product[];
  cart: CartItem[];
  favorites: Product[];
  loading: boolean;
  error: string | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const [brandNew, setBrandNew] = useState<Product[]>([]);
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const all = await getAllProducts();

        setAllProducts(all);

        const hot = all
          .map(p => ({
            ...p,
            discount: ((p.fullPrice - p.price) / p.fullPrice) * 100,
          }))
          .sort((a, b) => b.discount - a.discount)
          .slice(0, 20);

        setHotPrices(hot);

        const fresh = all
          .filter(p => p.year >= 2022)
          .sort((a, b) => b.year - a.year)
          .slice(0, 20);

        setBrandNew(fresh);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.itemId === product.itemId);

      if (existing) {
        return prev.map(p =>
          p.itemId === product.itemId ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(p => p.itemId !== productId));
  };

  const increaseQuantity = (productId: string) => {
    setCart(prev =>
      prev.map(p =>
        p.itemId === productId ? { ...p, quantity: p.quantity + 1 } : p,
      ),
    );
  };

  const decreaseQuantity = (productId: string) => {
    setCart(prev =>
      prev.map(p =>
        p.itemId === productId
          ? { ...p, quantity: p.quantity > 1 ? p.quantity - 1 : 1 }
          : p,
      ),
    );
  };

  const toggleFavorite = (product: Product) => {
    setFavorites(prev =>
      prev.find(p => p.itemId === product.itemId)
        ? prev.filter(p => p.itemId !== product.itemId)
        : [...prev, product],
    );
  };

  const isFavorite = (productId: string) => {
    return favorites.some(p => p.itemId === productId);
  };

  return (
    <GlobalContext.Provider
      value={{
        allProducts,
        hotPrices,
        brandNew,
        cart,
        favorites,
        loading,
        error,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        toggleFavorite,
        isFavorite,
        setCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  const ctx = useContext(GlobalContext);

  if (!ctx) {
    throw new Error('useGlobalContext must be used inside GlobalProvider');
  }

  return ctx;
}
