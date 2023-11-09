import React, { useState, useEffect } from 'react';
import { Product } from '../type/Product';
import { getProducts } from '../helpers/ProductServices';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const GlobalContext = React.createContext<({
  products: Product[],
  hasError: string,
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  localStore: Product[],
  setLocalStore: (v: Product[]) => void,
})>({
    products: [],
    hasError: '',
    setProducts: () => { },
    localStore: [],
    setLocalStore: () => { },
  });

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [localStore, setLocalStore]
    = useLocalStorage<Product[]>('products', []);
  const [hasError, setHasError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setHasError('');

      try {
        const loadedProducts = await getProducts();
        const updatedProducts = loadedProducts.map(item => {
          const elem = localStore.find(e => item.id === e.id);

          if (elem) {
            return elem;
          }

          return {
            ...item,
            inFavourite: false,
            inCart: false,
            discount: item.fullPrice - item.price,
          };
        });

        setProducts(updatedProducts);
      } catch (error) {
        setHasError('Something went wrong');
      }
    };

    fetchData();
  }, []);

  const value = {
    hasError,
    products,
    setProducts,
    localStore,
    setLocalStore,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
