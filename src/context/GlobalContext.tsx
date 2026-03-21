import {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Product } from '../types/Product';
import { Cart } from '../types/Cart';
import { getAllProducts } from '../utils/api';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../hooks/useTheme';
import { GlobalContextType, GlobalProviderProps } from './types/types';

const defaultContextValue: GlobalContextType = {
  allProducts: [],
  setAllProducts: () => {},
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  updateQuantity: () => {},
  clearShoppingCart: () => {},
  favorites: [],
  setFavorites: () => {},
  toggleFavorites: () => {},
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  toggleMenu: () => {},
  theme: 'light',
  toggleTheme: () => {},
};

export const GlobalContext =
  createContext<GlobalContextType>(defaultContextValue);

export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [cart, setCart] = useLocalStorage<Cart[]>('shoppingCart', []);
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();

        setAllProducts(products);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  const addToCart = useCallback(
    (product: Product) => {
      const isProductInCart = cart.some(
        item => item.product.itemId === product.itemId,
      );

      if (!isProductInCart) {
        const cartItem: Cart = {
          id: product.itemId,
          quantity: 1,
          product,
        };

        setCart(prevCart => [...prevCart, cartItem]);
      }
    },
    [cart, setCart],
  );

  const updateQuantity = useCallback(
    (id: string, newQuantity: number) => {
      setCart(prevCart =>
        prevCart
          .map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item,
          )
          .filter(item => item.quantity > 0),
      );
    },
    [setCart],
  );

  const clearShoppingCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const toggleFavorites = useCallback(
    (product: Product) => {
      setFavorites(prevFavorites => {
        const isInFavorites = prevFavorites.some(
          item => item.itemId === product.itemId,
        );

        return isInFavorites
          ? prevFavorites.filter(item => item.itemId !== product.itemId)
          : [...prevFavorites, product];
      });
    },
    [setFavorites],
  );

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const contextValue = useMemo(
    () => ({
      allProducts,
      setAllProducts,

      cart,
      setCart,
      addToCart,
      updateQuantity,
      clearShoppingCart,

      favorites,
      setFavorites,
      toggleFavorites,

      isMenuOpen,
      setIsMenuOpen,
      toggleMenu,

      theme,
      toggleTheme,
    }),
    [
      allProducts,
      setAllProducts,
      cart,
      setCart,
      favorites,
      setFavorites,
      isMenuOpen,
      setIsMenuOpen,
      theme,
      addToCart,
      updateQuantity,
      clearShoppingCart,
      toggleFavorites,
      toggleMenu,
      toggleTheme,
    ],
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
