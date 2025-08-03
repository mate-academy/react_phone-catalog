import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { Products } from '../types/types';
import useLocalStorage from '../components/Cart/UseLocalStorage';

type CartItem = Products & { quantity: number };

interface CartContextProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  lovelyProducts: Products[];
  setLovelyProducts: React.Dispatch<React.SetStateAction<Products[]>>;
  addToCart: (product: Products) => void;
  addProductToLovely: (product: Products) => void;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined,
);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'cartItems',
    [],
  );
  const [lovelyProducts, setLovelyProducts] = useLocalStorage<Products[]>(
    'favorites',
    [],
  );

  useEffect(() => {
    const favoritesFromStorage = localStorage.getItem('favorites');
    const addedFromStorage = localStorage.getItem('added');

    if (addedFromStorage) {
      const addedProducts = JSON.parse(addedFromStorage);

      if (addedProducts.length > 0) {
        setLovelyProducts(addedProducts);
      }
    }

    if (favoritesFromStorage) {
      const favorites = JSON.parse(favoritesFromStorage);

      if (favorites.length > 0) {
        setLovelyProducts(favorites);
      }
    }
  }, []);

  const addToCart = (product: Products) => {
    const existing = cartItems.find(item => item.itemId === product.itemId);

    if (existing) {
      const filteredProducts = cartItems.filter(
        item => item.itemId !== product.itemId,
      );

      setCartItems(filteredProducts);

      localStorage.setItem('added', JSON.stringify(filteredProducts));
    } else {
      const newProduct = { ...product, quantity: 1 };
      const allGadgets = [...cartItems, newProduct];

      setCartItems(allGadgets);
      localStorage.setItem('added', JSON.stringify(allGadgets));
    }
  };

  const addProductToLovely = (product: Products) => {
    const favoritesArray: Products[] | [] = JSON.parse(
      localStorage.getItem('favorites') || '[]',
    );

    if (lovelyProducts.some(item => item.itemId === product.itemId)) {
      const filteredProducts = lovelyProducts.filter(
        item => item.itemId !== product.itemId,
      );

      setLovelyProducts(filteredProducts);

      const updatedFavorites = favoritesArray.filter(
        item => item.itemId !== product.itemId,
      );

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      setLovelyProducts(currentsProducts => [...currentsProducts, product]);
      const allGadgets = [...lovelyProducts, product];

      localStorage.setItem('favorites', JSON.stringify(allGadgets));
    }
  };

  const values = useMemo(
    () => ({
      cartItems,
      setCartItems,
      lovelyProducts,
      setLovelyProducts,
      addToCart,
      addProductToLovely,
    }),
    [cartItems, lovelyProducts],
  );

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
