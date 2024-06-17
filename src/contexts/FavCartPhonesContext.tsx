import React, { useState } from 'react';
import { PhoneFromServer } from '../types/Phone';

export const FavCartPhonesContext = React.createContext([]);

export const PhoneProvider = ({ children }) => {
  const [phonesInCart, setPhonesInCart] = useState<PhoneFromServer[]>([]);
  const [phonesInFav, setPhonesInFav] = useState<PhoneFromServer[]>([]);

  return (
    <FavCartPhonesContext.Provider
      value={{ phonesInCart, setPhonesInCart, phonesInFav, setPhonesInFav }}>
      {children}
    </FavCartPhonesContext.Provider>
  );
};
