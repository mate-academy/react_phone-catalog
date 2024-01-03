import {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { useLocalStorsge } from '../hooks/useLocalStorage';
import { CartProperty, Product } from './types';

type Props = {
  children: React.ReactNode,
};

interface IProductContext {
  products: Product[],
  setProducts: (p: Product[]) => void,
  favorites: Product[],
  setfavorites: (p: Product[]) => void,
  addTofavoritesHandler: (id: string) => void,
  addedToCart: Product[],
  setAddedToCart: (p: Product[]) => void,
  addToCartHandler: (id: string) => void,
  cartContentData: CartProperty[],
  setCartContentData: (v: CartProperty[]) => void,
  totalPrices: number,
  setTotalPrices: (n: number) => void,
  isMenuActive: boolean,
  setIsMenuActive: (n: boolean) => void,
  windowWidth: number,
}

const defaultValue = {
  products: [],
  setProducts: () => { },
  favorites: [],
  setfavorites: () => { },
  addTofavoritesHandler: () => { },
  addedToCart: [],
  setAddedToCart: () => { },
  addToCartHandler: () => { },
  cartContentData: [],
  setCartContentData: () => { },
  totalPrices: 0,
  setTotalPrices: () => { },
  isMenuActive: false,
  setIsMenuActive: () => { },
  windowWidth: 0,
};

export const ProductContext = createContext<IProductContext>(defaultValue);

export const ProductContextProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setfavorites]
    = useLocalStorsge<Product[]>('favorites', []);
  const [addedToCart, setAddedToCart]
    = useLocalStorsge<Product[]>('addedToCart', []);
  const [cartContentData, setCartContentData]
    = useLocalStorsge<CartProperty[]>(
      'cartPrices', [{ phoneId: 'none', price: 0, amount: 0 }],
    );
  const [totalPrices, setTotalPrices] = useLocalStorsge('totalPrices', 0);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function addTofavoritesHandler(chosenProductID: string) {
    if (favorites.find(item => item.phoneId === chosenProductID)) {
      setfavorites(
        [...favorites].filter(item => item.phoneId !== chosenProductID),
      );
    } else {
      const chosenProduct = products
        .find(currProduct => currProduct.phoneId === chosenProductID);

      if (chosenProduct) {
        setfavorites([...favorites, chosenProduct]);
      }
    }
  }

  function addToCartHandler(chosenProductID: string) {
    if (addedToCart.find(item => item.phoneId === chosenProductID)) {
      setAddedToCart(
        [...addedToCart].filter(item => item.phoneId !== chosenProductID),
      );

      setCartContentData(
        [...cartContentData].filter(item => item.phoneId !== chosenProductID),
      );

      localStorage.removeItem(`${chosenProductID}amount`);
    } else {
      const chosenProduct = products
        .find(currProduct => currProduct.phoneId === chosenProductID);

      if (chosenProduct) {
        setAddedToCart([...addedToCart, chosenProduct]);
        setCartContentData([...cartContentData, {
          phoneId: chosenProductID,
          price: chosenProduct.price,
          amount: 1,
        }]);
      }
    }
  }

  const value = useMemo(() => ({
    products,
    setProducts,
    favorites,
    setfavorites,
    addTofavoritesHandler,
    addedToCart,
    setAddedToCart,
    addToCartHandler,
    cartContentData,
    setCartContentData,
    totalPrices,
    setTotalPrices,
    isMenuActive,
    setIsMenuActive,
    windowWidth,
  }), [
    favorites, addedToCart, products, totalPrices, isMenuActive, windowWidth,
  ]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
