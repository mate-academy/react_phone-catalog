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
  cart: Cart[];
  setCart: Dispatch<SetStateAction<Cart[]>>;
  addToCart: (productId: string) => void;
  deleteFromCart: (productId: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void,
  favorites: string[];
  setFavorites: Dispatch<SetStateAction<string[]>>;
  toggleFavorites: (productId: string) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  allProducts: [] as Product[],
  setAllProducts: () => {},
  cart: [] as Cart[],
  setCart: () => {},
  addToCart: () => {},
  deleteFromCart: () => { },
  updateQuantity: () => {},
  favorites: [],
  setFavorites: () => {},
  toggleFavorites: () => {},
});

type Props = {
  children: ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    getAllProducts()
      .then(productsFronServer => setAllProducts(productsFronServer))
      .catch(() => setErrorMessage('Products are not avaliable'));
  }, []);

  const addToCart = (productId: string) => {
    if (productId) {
      const isProductInCart = cart.some(
        cartItem => cartItem.id === productId,
      );

      if (!isProductInCart) {
        const newItem = {
          id: productId,
          quantity: 1,
        };

        setCart(prev => [...prev, newItem]);
      }
    }
  };

  const deleteFromCart = (productId: string) => {
    setCart(prev => {
      return prev.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = useCallback((id: string, newValue: number) => {
    setCart(prev => 
      prev.map(cart =>
        cart.id === id
          ? { ...cart, quantity: newValue }
          : cart
      ),
    );
  }, [setCart]);

  const toggleFavorites = (productId: string) => {
    if (productId) {
      const isProductInFavorites = favorites.some(
        fav => fav === productId,
      );

      setFavorites(prev => {
        if (!isProductInFavorites) {
          return [...prev, productId];
        } else {
          return prev.filter(item => item !== productId);
        }
      });
    }
  };

  const data = useMemo(
    () => ({
      allProducts,
      setAllProducts,
      cart,
      setCart,
      addToCart,
      deleteFromCart,
      updateQuantity,
      favorites,
      setFavorites,
      toggleFavorites,
    }),
    [
      allProducts,
      setAllProducts,
      cart,
      setCart,
      addToCart,
      updateQuantity,
      deleteFromCart,
      favorites,
      setFavorites,
      toggleFavorites,
    ],
  );

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};
