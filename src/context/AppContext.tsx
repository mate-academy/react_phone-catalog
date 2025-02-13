import React, { createContext, useEffect, useState } from 'react';
import { BannerSlidesType } from '../types/BannerSlidesType';
import { getBannerSlides } from '../utils/ts/api';

interface AppContextProps {
  bannerSlides: BannerSlidesType[];
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bannerSlides, setBannerSlides] = useState<BannerSlidesType[]>([]);

  useEffect(() => {
    getBannerSlides().then(slides => setBannerSlides(slides));
  }, []);

  return (
    <AppContext.Provider
      value={{
        bannerSlides,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
