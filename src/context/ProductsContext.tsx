import React, { useEffect, useState, useCallback } from 'react';
import { CartProducts } from '../types/CartProducts';
import { Product } from '../types/Product';
import { getProductsWithDelay } from '../services/api/api';

type Context = {
  allProducts: Product[];
  favorites: Product[];
  addFavorites: (product: Product) => void;
  deleteFromFavorites: (product: Product) => void;
  cart: CartProducts[];
  addCart: (product: CartProducts) => void;
  deleteFromCart: (productId: number) => void;
  modal: string;
  setModal: (message: string) => void;
  changeCountProduct: (productId: number, count: number) => void;
  clearCart: () => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProductsContext = React.createContext<Context>({
  allProducts: [],
  favorites: [],
  addFavorites: () => {},
  deleteFromFavorites: () => {},
  cart: [],
  addCart: () => {},
  deleteFromCart: () => {},
  modal: '',
  setModal: () => {},
  changeCountProduct: () => {},
  clearCart: () => {},
  setIsLoading: () => {},
  isLoading: false,
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartProducts[]>([]);
  const [modal, setModal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getProductsWithDelay().then(setAllProducts);
  }, []);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    const storedCart = localStorage.getItem('cart');

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addFavorites = useCallback((newProduct: Product) => {
    setFavorites(prev => [...prev, newProduct]);
  }, []);

  const deleteFromFavorites = useCallback((product: Product) => {
    setFavorites(prev => prev.filter(p => p !== product));
  }, []);

  const addCart = useCallback((newProduct: CartProducts) => {
    setCart(prev => [...prev, newProduct]);
  }, []);

  const deleteFromCart = useCallback((productId: number) => {
    setCart(prev => prev.filter(product => product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const changeCountProduct = useCallback((productId: number, count: number) => {
    setCart(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, quantity: Math.max(product.quantity + count, 1) }
          : product,
      ),
    );
  }, []);

  const contextValue = {
    allProducts,
    favorites,
    addFavorites,
    deleteFromFavorites,
    cart,
    addCart,
    deleteFromCart,
    modal,
    setModal,
    changeCountProduct,
    clearCart,
    isLoading,
    setIsLoading,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
