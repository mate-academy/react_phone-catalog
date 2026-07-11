import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../api/functionsRequestsApi';
import { CartItem } from '../types/CartItem';

type Props = {
  children: ReactNode;
};

type GlobalContextType = {
  allProducts: Product[];
  cartItems: CartItem[];
  totalCartItem: number;
  favoritesItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setFavoritesItems: React.Dispatch<React.SetStateAction<Product[]>>;
};

const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const localCartItems = localStorage.getItem('CartItems');

    if (localCartItems) {
      return JSON.parse(localCartItems);
    } else {
      return [];
    }
  });
  const [favoritesItems, setFavoritesItems] = useState<Product[]>(() => {
    const localFavoritesItems = localStorage.getItem('FavoritesItems');

    if (localFavoritesItems) {
      return JSON.parse(localFavoritesItems);
    } else {
      return [];
    }
  });

  useEffect(() => {
    getProducts().then(products => {
      setAllProducts(products);
    });
  }, []);

  const totalCartItem = useMemo(() => {
    return cartItems.reduce((previousValue, currentItem) => {
      return previousValue + currentItem.quantity;
    }, 0);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('CartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('FavoritesItems', JSON.stringify(favoritesItems));
  }, [favoritesItems]);

  return (
    <GlobalContext.Provider
      value={{
        allProducts,
        cartItems,
        totalCartItem,
        favoritesItems,
        setCartItems,
        setFavoritesItems,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }

  return context;
};
