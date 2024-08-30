import React, { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../../../Hooks/useLocalStorage';
import { Product } from '../../../type/Product';
import { fetchAllProductsFromApi } from '../../../api/api';

export const GlobalContext = createContext<GlobalContextType>({
  isSunSelected: true,
  setIsSunSelected: () => {},
  products: [],
  setcurrentCategory: () => {},
  currentCategory: null,
  isLoading: false,
  setIsLoading: () => {},
  isErrors: false,
  setIsErrors: () => {},
  setIsLiked: () => {},
  isLiked: [],
  handlerLikedCard: () => {},
  setIsGoods: () => {},
  isGoods: [],
  handlerAddProduct: () => {},
  handlerRemoveGoods: () => {},
  totalItems: 0,
  setTotalItems: () => {},
  totalPrice: 0,
  setTotalPrice: () => {},
});

type GlobalContextType = {
  isSunSelected: boolean;
  setIsSunSelected: React.Dispatch<React.SetStateAction<boolean>>;
  products: Product[];
  setcurrentCategory: (category: string | null) => void;
  currentCategory: string | null;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isErrors: boolean;
  setIsErrors: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLiked: React.Dispatch<React.SetStateAction<Product[]>>;
  isLiked: Product[];
  handlerLikedCard: (productId: number) => void;
  setIsGoods: React.Dispatch<React.SetStateAction<Product[]>>;
  isGoods: Product[];
  handlerAddProduct: (productId: number) => void;
  handlerRemoveGoods: (productId: number) => void;
  totalItems: number;
  setTotalItems: React.Dispatch<React.SetStateAction<number>>;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
};

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [isSunSelected, setIsSunSelected] = useLocalStorage<boolean>(
    'theme',
    true,
  );
  const [products, setProducts] = useLocalStorage<Product[]>('product', []);
  const [currentCategory, setcurrentCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErrors, setIsErrors] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useLocalStorage<Product[]>('liked', []);
  const [isGoods, setIsGoods] = useLocalStorage<Product[]>('goods', []);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const total = isGoods.reduce((sum, product) => sum + product.quantity, 0);
    const price = isGoods.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0,
    );

    setTotalItems(total);
    setTotalPrice(price);
  }, [isGoods, totalItems, totalPrice]);

  const handlerLikedCard = (productId: number) => {
    const result = products.find(goods => goods.id === productId);

    if (result) {
      const alreadyLiked = isLiked.some(product => product.id === result.id);

      if (alreadyLiked) {
        setIsLiked(prevValue =>
          prevValue.filter(product => product.id !== productId),
        );
      } else {
        setIsLiked(prevValue => [...prevValue, result]);
      }
    }
  };

  const handlerAddProduct = (productId: number) => {
    setIsGoods(prevGoods => {
      const existingProduct = prevGoods.find(
        product => product.id === productId,
      );

      if (existingProduct) {
        return prevGoods.filter(product => product.id !== productId);
      } else {
        const productToAdd = products.find(product => product.id === productId);

        if (productToAdd) {
          return [...prevGoods, { ...productToAdd, quantity: 1 }];
        }
      }

      return prevGoods;
    });
  };

  const handlerRemoveGoods = (productId: number) => {
    setIsGoods(prevGoods =>
      prevGoods.filter(product => product.id !== productId),
    );
  };

  useEffect(() => {
    fetchAllProductsFromApi().then(setProducts);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isSunSelected,
        setIsSunSelected,
        products,
        setcurrentCategory,
        currentCategory,
        isLoading,
        setIsLoading,
        isErrors,
        setIsErrors,
        setIsLiked,
        isLiked,
        handlerLikedCard,
        setIsGoods,
        isGoods,
        handlerAddProduct,
        handlerRemoveGoods,
        totalItems,
        setTotalItems,
        totalPrice,
        setTotalPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
