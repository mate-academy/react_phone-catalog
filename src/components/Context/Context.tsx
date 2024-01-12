/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Product } from '../../types/Products';
import { getItem, setItem } from '../../api/LocaleStorage/LocaleStorage';

interface ContextType {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  handleAddToBasket: (product: Product) => void;
  handleAddToFavorite: (product: Product) => void;
  handleRemoveFromBasket: (productId: string) => void;
  increment: (product: Product) => void;
  decrement: (product: Product) => void;
  getProductCount: (productId: string) => number;
  visibleProducts: Product[],
  getFavorite: Product[];
  getBasket: Product[];
  defaultStateValue: {
    countBasket: number,
    countFavorite: number,
  }
}

interface ContextProviderProps {
  children: ReactNode;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [searchText, setSearchText] = useState('');

  const [defaultStateValue, setDefaultStateValue] = useState({
    countBasket: 0,
    countFavorite: 0,
  });

  const getBasket: Product[] = getItem('basket') || [];
  const getFavorite: Product[] = getItem('favorite') || [];

  useEffect(() => {

    setDefaultStateValue((prevState) => {
      return {
        ...prevState,
        countBasket: getBasket.length,
        countFavorite: getFavorite.length,
      };
    });
  }, [getBasket.length, getFavorite.length]);

  const handleAddTo = (product: Product, list: Product[], listKey: string) => {
    const productIndex = list.findIndex(item => item.id === product.id);
    const isProductInList = productIndex !== -1;

    const updatedList = isProductInList
      ? list.filter(item => item.id !== product.id)
      : [...list, product];

    setItem(listKey, updatedList);

    setDefaultStateValue((prevState) => {
      return {
        ...prevState,
        countBasket: listKey === 'basket' ? updatedList.length : prevState.countBasket,

        countFavorite: listKey === 'favorite' ? updatedList.length : prevState.countFavorite,
      };
    });
  };

  const handleAddToBasket = (product: Product) => {
    handleAddTo(product, getBasket, 'basket');
  };

  const handleAddToFavorite = (product: Product) => {
    handleAddTo(product, getFavorite, 'favorite');
  };

  const handleRemoveFromBasket = (productId: string) => {
    const updatedBasket = getBasket.filter(item => item.phoneId !== productId);

    setItem('basket', updatedBasket);

    setDefaultStateValue((prevState) => {
      return {
        ...prevState,
        countBasket: updatedBasket.length,
      };
    });
  };

  const isInCard: string[] = [];

  const visibleProducts = getBasket.filter(item => {
    if (isInCard.includes(item.id)) {
      return false;
    }

    isInCard.push(item.id);

    return true;
  });

  const increment = (product: Product) => {
    setItem('basket', [...getBasket, product]);

    setDefaultStateValue((prevState) => {
      return {
        ...prevState,
        countBasket: prevState.countBasket + 1,
      };
    });
  };

  const decrement = (product: Product) => {
    const productIndex = getBasket.reverse().findIndex(item => item.id === product.id);

    if (productIndex !== -1) {
      const updatedBasket = [...getBasket];

      updatedBasket.splice(productIndex, 1);

      setItem('basket', updatedBasket.reverse());

      setDefaultStateValue((prevState) => {
        return {
          ...prevState,
          countBasket: prevState.countBasket - 1,
        };
      });
    }
  };

  const getProductCount = (productId: string) => {
    const count = getBasket.filter(prod => prod.id === productId);

    return count.length;
  };

  return (
    <Context.Provider value={{
      searchText,
      increment,
      decrement,
      setSearchText,
      handleAddToBasket,
      handleAddToFavorite,
      handleRemoveFromBasket,
      getProductCount,
      defaultStateValue,
      getFavorite,
      getBasket,
      visibleProducts,
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
