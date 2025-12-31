import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { ReactNode, useState } from 'react';
import { Product } from '../types/Product';
import { getAllProducts } from '../utils/api';
import { Cart } from '../types/Cart';

type GlobalContextType = {
  allProducts: Product[];
  setAllProducts: Dispatch<SetStateAction<Product[]>>;
  reloadProducts: () => Promise<void>;
  cart: Cart[];
  setCart: Dispatch<SetStateAction<Cart[]>>;
  addToCart: (productId: string) => void;
  deleteFromCart: (productId: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  favorites: string[];
  setFavorites: Dispatch<SetStateAction<string[]>>;
  toggleFavorites: (productId: string) => void;
  productsError: string;
};

export const GlobalContext = createContext<GlobalContextType>({
  allProducts: [] as Product[],
  setAllProducts: () => {},
  reloadProducts: async () => {},
  cart: [] as Cart[],
  setCart: () => {},
  addToCart: () => {},
  deleteFromCart: () => {},
  updateQuantity: () => {},
  favorites: [],
  setFavorites: () => {},
  toggleFavorites: () => {},
  productsError: '',
});

type Props = {
  children: ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [productsError, setProductsError] = useState<string>('');
  const [cart, setCart] = useState<Cart[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const loadProducts = useCallback(async () => {
    try {
      setProductsError('');
      const data = await getAllProducts();

      setAllProducts(data);
    } catch {
      setProductsError('Products are not available');
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const addToCart = useCallback((productId: string) => {
    if (productId) {
      setCart(prev => {
        const isProductInCart = prev.some(
          cartItem => cartItem.id === productId,
        );

        if (!isProductInCart) {
          return [...prev, { id: productId, quantity: 1 }];
        }

        return prev;
      });
    }
  }, []);

  const deleteFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((id: string, newValue: number) => {
    setCart(prev =>
      prev.map(c => (c.id === id ? { ...c, quantity: newValue } : c)),
    );
  }, []);

  const toggleFavorites = useCallback((productId: string) => {
    if (productId) {
      setFavorites(prev => {
        const isProductInFavorites = prev.some(fav => fav === productId);

        if (!isProductInFavorites) {
          return [...prev, productId];
        } else {
          return prev.filter(item => item !== productId);
        }
      });
    }
  }, []);

  const data = useMemo(
    () => ({
      allProducts,
      setAllProducts,
      reloadProducts: loadProducts,
      cart,
      setCart,
      addToCart,
      deleteFromCart,
      updateQuantity,
      favorites,
      setFavorites,
      toggleFavorites,
      productsError,
    }),
    [
      allProducts,
      loadProducts,
      cart,
      addToCart,
      deleteFromCart,
      updateQuantity,
      favorites,
      toggleFavorites,
      productsError,
    ],
  );

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};
