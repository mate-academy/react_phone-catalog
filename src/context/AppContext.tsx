import React, { createContext, useEffect, useState } from 'react';
import { BannerSlidesType } from '../types/BannerSlidesType';
import { getBannerSlides, getPhones } from '../utils/ts/api';
import { useLocation } from 'react-router-dom';
import { PhoneType } from '../types/PhoneType';

interface AppContextProps {
  bannerSlides: BannerSlidesType[];
  phones: PhoneType[];
  activeLink: string;
  activeProduct: PhoneType | null;
  handleActiveProduct: (product: string) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [bannerSlides, setBannerSlides] = useState<BannerSlidesType[]>([]);
  const [phones, setPhones] = useState<PhoneType[]>([]);
  const [activeProduct, setActiveProduct] = useState<PhoneType | null>(null);
  const activeLink = useLocation().pathname;

  useEffect(() => {
    getBannerSlides().then(slides => setBannerSlides(slides));
    getPhones().then(phonesFromServer => setPhones(phonesFromServer));
  }, []);

  const handleActiveProduct = (productId: string) => {
    setActiveProduct(phones.find(phone => phone.id === productId) || null);
  };

  return (
    <AppContext.Provider
      value={{
        bannerSlides,
        phones,
        activeLink,
        activeProduct,
        handleActiveProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
