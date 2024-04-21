import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { ScreenSizeContext, ScreenType } from '../ScreenSizeProvider';

type MenuContextType = [boolean, (arg: boolean) => void];

export const MenuContext = createContext<MenuContextType>(
  [false, () => { }],
);

interface Props {
  children: React.ReactNode;
}

export const MenuContextProvider: React.FC<Props> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const screenSize = useContext(ScreenSizeContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if ((screenSize === ScreenType.isTablet
      || screenSize === ScreenType.isDesktop) && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen, screenSize]);

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <MenuContext.Provider value={[isMenuOpen, setIsMenuOpen]}>
      {children}
    </MenuContext.Provider>
  );
};
