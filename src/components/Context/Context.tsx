/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, {
  createContext,
  useContext,
  useState,
} from 'react';
import { Product } from '../../types/Products';
import { getItem, setItem } from '../../api/LocaleStorage/LocaleStorage';

interface ContextType {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  handleAddToBasket: (product: Product) => void;
  handleAddToFavorite: (product: Product) => void;
  getBasket: Product[];
  getFavorite: Product[];
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider: React.FC = ({ children }) => {
  const [searchText, setSearchText] = useState('');
  const [, setReload] = useState<Product[]>([]);

  const getBasket: Product[] = getItem('basket') || [];
  const getFavorite: Product[] = getItem('favorite') || [];

  const handleAddTo = (product: Product, list: Product[], listKey: string) => {
    const productInclude = list.some(item => item.id === product.id);

    if (!productInclude) {
      setItem(listKey, [...list, product]);
      console.log('setItem', !productInclude);
      setReload([...list, product]);
    } else {
      const updatedList = [...list];
      const productIndex = list.findIndex(item => item.id === product.id);

      updatedList.splice(productIndex, 1);

      setItem(listKey, updatedList);
      setReload(updatedList);
      console.log('noADD', !productInclude);
    }
  };

  const handleAddToBasket = (product: Product) => {
    handleAddTo(product, getBasket, 'basket');
  };

  const handleAddToFavorite = (product: Product) => {
    handleAddTo(product, getFavorite, 'favorite');
  };

  return (
    <Context.Provider value={{
      searchText,
      setSearchText,
      handleAddToBasket,
      handleAddToFavorite,
      getBasket,
      getFavorite,
    }}
    >
      {children}
    </Context.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }

  return context;
};
