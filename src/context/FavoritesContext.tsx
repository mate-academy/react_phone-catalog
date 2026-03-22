// src/context/FavoritesContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/Product';

// 1. Interface defining the capabilities of our Favorites system
interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // --- INITIALIZATION ---
  // Load favorites from localStorage on mount so "hearts" don't disappear after a page refresh
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favorites');

    return saved ? JSON.parse(saved) : [];
  });

  // --- PERSISTENCE ---
  // Sync the favorites state with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // --- ACTIONS ---

  // Adds a product object to the favorites array
  const addToFavorites = (product: Product) => {
    setFavorites(prev => [...prev, product]);
  };

  // Filters out a product from the list based on its unique itemId
  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => prev.filter(item => item.itemId !== productId));
  };

  // Helper function to check if a specific product is already liked
  // Used by ProductCard to determine which heart icon (filled/outline) to show
  const isFavorite = (productId: string) => {
    return favorites.some(item => item.itemId === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// --- CUSTOM HOOK ---
// Provides an easy way for components to access favorite state and methods
export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
};
