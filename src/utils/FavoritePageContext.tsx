import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/ProductTypes';
import { Phone } from '../types/PhoneTypes';
import { Tablet } from '../types/TabletType';
import { Accessory } from '../types/AccessorieTypes';

// Уніфікований тип для улюблених товарів
export interface FavoriteItem {
  id: string;
  category: 'phones' | 'tablets' | 'accessories';
  itemId: string;
  name: string;
  fullPrice?: number;
  price?: number;
  priceRegular?: number;
  priceDiscount?: number;
  image?: string;
  images?: string[];
  screen?: string;
  capacity?: string;
  color?: string;
  ram?: string;
  year?: number;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: Product | Phone | Tablet | Accessory) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  favoritesCount: number;
  getFavoritesAsProducts: () => Product[];
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Функція для конвертації різних типів продуктів в уніфікований формат
const convertToFavoriteItem = (item: Product | Phone | Tablet | Accessory): FavoriteItem => {
  // Перевіряємо чи це Product (з ProductCard)
  if ('fullPrice' in item && typeof item.id === 'number') {
    const product = item as Product;
    return {
      id: product.itemId || product.id.toString(),
      category: product.category,
      itemId: product.itemId,
      name: product.name,
      fullPrice: product.fullPrice,
      price: product.price,
      image: product.image,
      screen: product.screen,
      capacity: product.capacity,
      color: product.color,
      ram: product.ram,
      year: product.year,
    };
  }

  // Інакше це Phone/Tablet/Accessory (з DetailPage)
  const detailProduct = item as Phone | Tablet | Accessory;
  return {
    id: detailProduct.id,
    category: detailProduct.category as 'phones' | 'tablets' | 'accessories',
    itemId: detailProduct.itemId,
    name: detailProduct.name,
    priceRegular: detailProduct.priceRegular,
    priceDiscount: detailProduct.priceDiscount,
    images: detailProduct.images,
    image: detailProduct.images?.[0],
    screen: detailProduct.screen,
    capacity: detailProduct.capacity,
    color: detailProduct.color,
    ram: detailProduct.ram,
  };
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item: Product | Phone | Tablet | Accessory) => {
    const favoriteItem = convertToFavoriteItem(item);
    setFavorites(prev => {
      if (prev.some(fav => fav.id === favoriteItem.id)) {
        return prev;
      }
      return [...prev, favoriteItem];
    });
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const isFavorite = (id: string): boolean => {
    return favorites.some(item => item.id === id);
  };

  const getFavoritesAsProducts = (): Product[] => {
    return favorites.map((item, index) => ({
      id: index + 1,
      category: item.category,
      itemId: item.itemId,
      name: item.name,
      fullPrice: item.fullPrice || item.priceRegular || 0,
      price: item.price || item.priceDiscount || 0,
      screen: item.screen,
      capacity: item.capacity,
      color: item.color,
      ram: item.ram,
      year: item.year || new Date().getFullYear(),
      image: item.image || item.images?.[0] || '/img/placeholder.webp',
    }));
  };

  const favoritesCount = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        favoritesCount,
        getFavoritesAsProducts,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
