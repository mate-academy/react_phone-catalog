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
  basketPhones: Phone[];
  addToBasket: (basketPhones: Phone) => void;
  handlerDelete: (basketPhone: Phone) => void;
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

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [favoritePhones, setFavoritePhones] = useState<Phone[]>([]);
  const [basketPhones, setBasketPhones] = useState<Phone[]>([]);

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
    if (basketPhones.some(basketPhone => basketPhone.id === phone.id)) {
      setBasketPhones(prev => prev
        .filter(basketPhone => basketPhone.id !== phone.id));
    } else {
      setBasketPhones(prev => [...prev, phone]);
    }
  };

  const handlerDelete = (phone: Phone) => {
    setBasketPhones(prevBasketPhones => prevBasketPhones
      .filter(basketPhone => basketPhone.id !== phone.id));
  };

  return (
    <HeaderContext.Provider value={{
      inputValue,
      handleSearch,
      favoritePhones,
      addToFavorite,
      basketPhones,
      addToBasket,
      handlerDelete,
    }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
