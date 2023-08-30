import { createContext } from 'react';

interface PhoneCatalogContextType {
  windowWidth: number;
  isMobile: boolean;
  isMenuClicked: boolean;
  setIsMenuClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PhoneCatalogContext = createContext<PhoneCatalogContextType>({
  windowWidth: window.innerWidth,
  isMobile: false,
  isMenuClicked: false,
  setIsMenuClicked: () => {},
});
