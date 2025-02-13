import React, { createContext, useEffect, useState } from 'react';
import { BannerSlidesType } from '../types/BannerSlidesType';
import { getBannerSlides } from '../utils/ts/api';
import { PageLinks } from '../types/PageLinks';

interface AppContextProps {
  bannerSlides: BannerSlidesType[];
  activeLink: PageLinks;
  handlePageLinkClick: (link: PageLinks) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bannerSlides, setBannerSlides] = useState<BannerSlidesType[]>([]);
  const [activeLink, setActiveLink] = useState<PageLinks>(PageLinks.HOME);

  useEffect(() => {
    getBannerSlides().then(slides => setBannerSlides(slides));
  }, []);

  const handlePageLinkClick = (link: PageLinks) => {
    setActiveLink(link);
  };

  return (
    <AppContext.Provider
      value={{
        bannerSlides,
        activeLink,
        handlePageLinkClick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
