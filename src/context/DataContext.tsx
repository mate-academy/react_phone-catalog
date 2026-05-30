import React, { createContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { Phone, Tablet, Accessory } from '../types/ProductDetails';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isLoading: boolean;
  error: string | null;
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  favorites: Product[];
  setFavorites: (favorites: Product[]) => void;
  cart: Product[];
  setCart: (cart: Product[]) => void;
  phones: Phone[];
  tablets: Tablet[];
  accessories: Accessory[];
};

export const DataContext = createContext<ContextType>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  isLoading: false,
  error: null,
  products: [],
  selectedProduct: null,
  setSelectedProduct: () => {},
  favorites: [],
  setFavorites: () => {},
  cart: [],
  setCart: () => {},
  phones: [],
  tablets: [],
  accessories: [],
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);

  // --- FETCH DATA ---
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch('api/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });

    fetch('api/phones.json')
      .then(res => res.json())
      .then(data => {
        setPhones(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });

    fetch('api/tablets.json')
      .then(res => res.json())
      .then(data => {
        setTablets(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });

    fetch('api/accessories.json')
      .then(res => res.json())
      .then(data => {
        setAccessories(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <DataContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        isLoading,
        error,
        products,
        selectedProduct,
        setSelectedProduct,
        favorites,
        setFavorites,
        cart,
        setCart,
        phones,
        tablets,
        accessories,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
