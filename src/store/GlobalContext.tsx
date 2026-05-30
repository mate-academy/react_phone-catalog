import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Product } from '../types/Product';
import { CartProduct } from '../types/CartProduct';
import { getAllProducts } from '../utils/productApi';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../hooks/useTheme';

type GlobalContextType = {
  allProducts: Product[];
  setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartProduct[];
  setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  updateQuantity: (id: string, newQuantity: number) => void;
  clearShoppingCart: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMenu: () => void;
  toggleFavorites: (currentProduct: Product) => void;
  addToCart: (currentProduct: Product) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const GlobalContext = React.createContext<GlobalContextType>({
  allProducts: [] as Product[],
  setAllProducts: () => {},
  cart: [] as CartProduct[],
  setCart: () => {},
  favorites: [] as Product[],
  setFavorites: () => {},
  updateQuantity: () => {},
  clearShoppingCart: () => {},
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  toggleMenu: () => {},
  toggleFavorites: () => {},
  addToCart: () => {},
  theme: 'light',
  toggleTheme: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [cart, setCart] = useLocalStorage<CartProduct[]>('shoppingCart', []);
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchAllProducts = () => {
      getAllProducts()
        .then(fetchedProducts => {
          setAllProducts(fetchedProducts);
        })
        .catch(error => {
          throw new Error(`Error fetching products: ${error.message}`);
        })
        .finally(() => {});
    };

    fetchAllProducts();
  }, []);

  const updateQuantity = useCallback(
    (id: string, newQuantity: number) => {
      setCart(prevCart => {
        const updatedShoppingCart = prevCart
          .map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item,
          )
          .filter(item => item.quantity > 0);

        return updatedShoppingCart;
      });
    },
    [setCart],
  );

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prevState => !prevState);
  }, []);

  useEffect(() => {
    const overflowStyle = isMenuOpen ? 'hidden' : 'auto';

    document.body.style.overflow = overflowStyle;

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const addToCart = useCallback(
    (product: Product) => {
      if (product) {
        const isInCart = cart.some(
          item => item.product.itemId === product.itemId,
        );

        if (!isInCart) {
          const newProduct: CartProduct = {
            id: product.itemId,
            quantity: 1,
            product: product,
          };

          setCart(prevCart => [...prevCart, newProduct]);
        }
      }
    },
    [cart, setCart],
  );

  const toggleFavorites = useCallback(
    (currentProduct: Product) => {
      const isInFavorites = favorites.some(
        item => item.itemId === currentProduct.itemId,
      );

      setFavorites(prevFavorites => {
        if (isInFavorites) {
          return prevFavorites.filter(
            item => item.itemId !== currentProduct.itemId,
          );
        } else {
          return [...prevFavorites, currentProduct];
        }
      });
    },
    [favorites, setFavorites],
  );

  const clearShoppingCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const data = useMemo(
    () => ({
      allProducts,
      setAllProducts,
      cart,
      setCart,
      favorites,
      setFavorites,
      updateQuantity,
      clearShoppingCart,
      isMenuOpen,
      setIsMenuOpen,
      toggleMenu,
      toggleFavorites,
      addToCart,
      theme,
      toggleTheme,
    }),
    [
      allProducts,
      cart,
      favorites,
      setAllProducts,
      setCart,
      setFavorites,
      clearShoppingCart,
      updateQuantity,
      isMenuOpen,
      setIsMenuOpen,
      toggleMenu,
      toggleFavorites,
      addToCart,
      theme,
      toggleTheme,
    ],
  );

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};
