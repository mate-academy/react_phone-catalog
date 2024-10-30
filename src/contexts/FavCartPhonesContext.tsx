import React, { useState, ReactNode } from 'react';
import { PhoneFromServer } from '../types/Phone';
import { Context } from '../types/Context';

interface Props {
  children: ReactNode;
}

const defaultContextValue: Context = {
  phonesInCart: [],
  setPhonesInCart: () => {},
  selectedPhonesInFavCount: 0,
  selectedPhonesInCartCount: 0,
  setSelectedPhonesInFavCount: () => {},
  setSelectedPhonesInCartCount: () => {},
  phonesInFav: [],
  setPhonesInFav: () => {},
};

export const FavCartPhonesContext =
  React.createContext<Context>(defaultContextValue);

export const PhoneProvider = ({ children }: Props) => {
  const [phonesInCart, setPhonesInCart] = useState<PhoneFromServer[]>([]);
  const [selectedPhonesInFavCount, setSelectedPhonesInFavCount] = useState(0);
  const [selectedPhonesInCartCount, setSelectedPhonesInCartCount] = useState(0);
  const [phonesInFav, setPhonesInFav] = useState<PhoneFromServer[]>([]);

  return (
    <FavCartPhonesContext.Provider
      value={{
        phonesInCart,
        setPhonesInCart,
        selectedPhonesInFavCount,
        selectedPhonesInCartCount,
        setSelectedPhonesInFavCount,
        setSelectedPhonesInCartCount,
        phonesInFav,
        setPhonesInFav,
      }}
    >
      {children}
    </FavCartPhonesContext.Provider>
  );
};
