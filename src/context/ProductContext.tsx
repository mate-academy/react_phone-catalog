import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Product } from '../types/Product';
import { CartItemProps } from '../types/CartItem';
import {
  getAllProduct,
  getHotPriceProducts,
  getNewProducts,
  getProductsByCategory,
  getSuggestedProducts,
} from '../services/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ContextProps {
  cart: CartItemProps[];
  favorites: Product[];
  newProducts: Product[];
  hotProducts: Product[];
  phones: Product[];
  tablets: Product[];
  accessories: Product[];
  allProducts: Product[];
  suggestedProducts: Product[];
  loading: boolean;
  error: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  addToFavorite: (product: Product) => void;
  addToCart: (product: Product) => void;
  removeFromFavorite: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  getTotalSum: () => number;
  updateCart: (id: number, quantity: number) => void;
  setCart: (
    v: CartItemProps[] | ((val: CartItemProps[]) => CartItemProps[]),
  ) => void;
  reloading: () => void;
  totalItemsInCart: number;
  increase: (productId: number, quantity: number) => void;
  decrease: (productId: number, quantity: number) => void;
}

export const ProductContext = React.createContext<ContextProps>({
  cart: [],
  favorites: [],
  newProducts: [],
  hotProducts: [],
  phones: [],
  tablets: [],
  accessories: [],
  suggestedProducts: [],
  loading: false,
  error: false,
  allProducts: [],
  reloading: () => {},
  setLoading: () => {},
  setError: () => {},
  setCart: () => {},
  addToFavorite: () => {},
  addToCart: () => {},
  removeFromFavorite: () => {},
  removeFromCart: () => {},
  getTotalSum: () => 0,
  updateCart: () => {},
  totalItemsInCart: 0,
  increase: () => {},
  decrease: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartItemProps[]>('cart', []);
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(new Date());
  const [totalItemsInCart, setTotalItemsInCart] = useState(cart.length);

  const reloading = useCallback(() => {
    setReload(new Date());
  }, []);

  useEffect(() => {
    setLoading(true);

    getAllProduct()
      .then(setAllProducts)
      .catch(() => setError(false))
      .finally(() => setLoading(false));
  }, [reload]);

  useEffect(() => {
    setLoading(true);

    getNewProducts()
      .then(setNewProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [reload]);

  useEffect(() => {
    setLoading(true);
    getHotPriceProducts()
      .then(setSuggestedProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [reload]);

  useEffect(() => {
    setLoading(true);
    getSuggestedProducts()
      .then(setHotProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [reload]);

  const addToFavorite = useCallback(
    (product: Product) => {
      setFavorites(currentFavorite => [...currentFavorite, product]);
    },
    [setFavorites],
  );

  const removeFromFavorite = useCallback(
    (productId: number) => {
      setFavorites(currentFavorite =>
        currentFavorite.filter(product => product.id !== productId),
      );
    },
    [setFavorites],
  );

  const addToCart = useCallback(
    (product: Product) => {
      setCart(currentCart => {
        const existingItem = currentCart.find(
          item => item.product.id === product.id,
        );

        if (existingItem) {
          return currentCart.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        } else {
          return [...currentCart, { product, quantity: 1 }];
        }
      });
    },
    [setCart],
  );

  const updateCart = useCallback(
    (id: number, quantity: number) => {
      setCart(currentCart => {
        const updatedCart = currentCart
          .map(item =>
            item.product.id === id
              ? { ...item, quantity: Math.max(quantity, 1) }
              : item,
          )
          .filter(item => item.quantity > 0);

        return updatedCart;
      });
    },
    [setCart],
  );

  const removeFromCart = useCallback(
    (productId: number) => {
      setCart(currentProducts =>
        currentProducts.filter(product => product.product.id !== productId),
      );
    },
    [setCart],
  );

  const getTotalSum = useCallback(() => {
    return cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }, [cart]);

  const increase = useCallback(
    (productId: number, quantity: number) => {
      updateCart(productId, quantity + 1);
      setTotalItemsInCart(prev => prev + 1);
    },
    [updateCart, cart, totalItemsInCart],
  );

  const decrease = useCallback(
    (productId: number, quantity: number) => {
      if (quantity > 1) {
        updateCart(productId, quantity - 1);
        setTotalItemsInCart(prev => prev - 1);
      }
    },
    [updateCart, cart],
  );

  useEffect(() => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    setTotalItemsInCart(totalItems);
  }, [cart]);

  useEffect(() => {
    setLoading(true);
    getProductsByCategory('phones')
      .then(setPhones)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [reload]);

  useEffect(() => {
    setLoading(true);
    getProductsByCategory('tablets')
      .then(setTablets)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [reload]);

  useEffect(() => {
    setLoading(true);
    getProductsByCategory('accessories')
      .then(setAccessories)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [reload]);

  const value = useMemo(
    () => ({
      cart,
      favorites,
      newProducts,
      hotProducts,
      phones,
      tablets,
      accessories,
      loading,
      error,
      allProducts,
      suggestedProducts,
      setLoading,
      setError,
      addToFavorite,
      addToCart,
      removeFromFavorite,
      removeFromCart,
      getTotalSum,
      updateCart,
      setCart,
      reloading,
      totalItemsInCart,
      increase,
      decrease,
    }),
    [
      cart,
      favorites,
      newProducts,
      hotProducts,
      phones,
      tablets,
      accessories,
      loading,
      error,
      allProducts,
      suggestedProducts,
      setLoading,
      setError,
      addToFavorite,
      addToCart,
      removeFromFavorite,
      removeFromCart,
      getTotalSum,
      updateCart,
      reloading,
      totalItemsInCart,
      increase,
      decrease,
    ],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
