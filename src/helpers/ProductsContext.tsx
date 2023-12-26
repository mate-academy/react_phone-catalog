import {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { useLocalStorsge } from '../hooks/useLocalStorage';
import { getProducts } from './productsServise';
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
  cartPrices: CartProperty[],
  setCartPrices: (v: CartProperty[]) => void,
  totalPrices: number,
  setTotalPrices: (n: number) => void,
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
  cartPrices: [],
  setCartPrices: () => { },
  totalPrices: 0,
  setTotalPrices: () => { },
};

export const ProductContext = createContext<IProductContext>(defaultValue);

export const ProductContextProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setfavorites]
    = useLocalStorsge<Product[]>('favorites', []);
  const [addedToCart, setAddedToCart]
    = useLocalStorsge<Product[]>('addedToCart', []);
  const [cartPrices, setCartPrices]
    = useLocalStorsge<CartProperty[]>(
      'cartPrices', [{ phoneId: 'none', price: 0, amount: 0 }],
    );
  const [totalPrices, setTotalPrices] = useLocalStorsge('totalPrices', 0);

  useEffect(() => {
    getProducts().then(setProducts);
  });

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

      setCartPrices(
        [...cartPrices].filter(item => item.phoneId !== chosenProductID),
      );

      localStorage.removeItem(`${chosenProductID}amount`);
    } else {
      const chosenProduct = products
        .find(currProduct => currProduct.phoneId === chosenProductID);

      if (chosenProduct) {
        setAddedToCart([...addedToCart, chosenProduct]);
        setCartPrices([...cartPrices, {
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
    cartPrices,
    setCartPrices,
    totalPrices,
    setTotalPrices,
  }), [favorites, addedToCart, products, totalPrices]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
