import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { Phone } from '../types/phone';

interface HeaderContextType {
  inputValue: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  favoritePhones: Phone[];
  addToFavorite: (favoritePhones: Phone) => void;
  addToBasket: (basketPhones: Phone) => void;
  handlerDelete: (basketPhone: Phone) => void;
  addToBasketWithName: (phone: Phone) => void;
  addToFavoriteWithName: (phone: Phone) => void;
  increaseItemCount: (phoneId: string) => void;
  decreaseItemCount: (phoneId: string) => void;
  basketItems: BasketItem[],
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error('useHeaderContext must be used within a HeaderProvider');
  }

  return context;
};

interface HeaderProviderProps {
  children: ReactNode;
}
type BasketItem = {
  phone: Phone
  count: number
};

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [favoritePhones, setFavoritePhones] = useState<Phone[]>([]);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addToFavorite = (phone: Phone) => {
    if (favoritePhones.some(favoritePhone => favoritePhone.id === phone.id)) {
      setFavoritePhones(prev => prev.filter(
        favoritePhone => favoritePhone.id !== phone.id,
      ));
    } else {
      setFavoritePhones(prev => [...prev, phone]);
    }
  };

  const addToBasket = (phone: Phone) => {
    if (basketItems.some(basketItem => basketItem.phone.id === phone.id)) {
      setBasketItems(prev => prev.map(item => {
        if (item.phone.id === phone.id) {
          return { ...item, count: item.count + 1 };
        }

        return item;
      }));
    } else {
      setBasketItems(prev => [...prev, { phone, count: 1 }]);
    }
  };

  const handlerDelete = (basketPhone: Phone) => {
    setBasketItems(prevBasketItems => prevBasketItems
      .filter(item => item.phone.id !== basketPhone.id));
  };

  const increaseItemCount = (phoneId: string) => {
    setBasketItems(prev => prev.map(item => {
      if (item.phone.id === phoneId) {
        return { ...item, count: item.count + 1 };
      }

      return item;
    }));
  };

  const decreaseItemCount = (phoneId: string) => {
    setBasketItems(prev => prev.map(item => {
      if (item.phone.id === phoneId && item.count > 1) {
        return { ...item, count: item.count - 1 };
      }

      return item;
    }));
  };

  const addToFavoriteWithName = (phone: Phone) => {
    if (favoritePhones.some(favoritePhone => favoritePhone.id === phone.name)) {
      setFavoritePhones(prev => prev.filter(
        favoritePhone => favoritePhone.id !== phone.name,
      ));
    } else {
      setFavoritePhones(prev => [...prev, phone]);
    }
  };

  const addToBasketWithName = (phone: Phone) => {
    if (basketItems.some(basketItem => basketItem.phone.id === phone.name)) {
      setBasketItems(prev => prev.map(item => {
        if (item.phone.name === phone.name) {
          return { ...item, count: item.count + 1 };
        }

        return item;
      }));
    } else {
      setBasketItems(prev => [...prev, { phone, count: 1 }]);
    }
  };

  return (
    <HeaderContext.Provider value={{
      inputValue,
      handleSearch,
      favoritePhones,
      addToFavorite,
      addToBasket,
      handlerDelete,
      increaseItemCount,
      decreaseItemCount,
      basketItems,
      addToBasketWithName,
      addToFavoriteWithName,
    }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
