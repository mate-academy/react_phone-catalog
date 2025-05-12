import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTheme } from '../hooks/useTheme';
import { Theme } from '../types/Theme';
import { Cart } from '../types/Cart';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Product } from '../types/Product';

type GlobalContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (newValue: boolean) => void;
  toggleMenu: () => void;
  theme: Theme;
  toggleTheme: () => void;
  carts: Cart[];
  setCarts: (newValue: Cart[]) => void;
  favourites: Product[];
  setFavourites: (newValue: Product[]) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  toggleMenu: () => {},
  theme: 'light',
  toggleTheme: () => {},
  carts: [],
  setCarts: () => {},
  favourites: [],
  setFavourites: () => {},
});

type Props = {
  children: ReactNode;
};

export const GlobalProvider: FC<Props> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [carts, setCarts] = useLocalStorage<Cart[]>('carts', []);
  const [favourites, setFavourites] = useLocalStorage<Product[]>(
    'favourites',
    [],
  );

  const toggleMenu = useCallback(
    () => setIsMenuOpen(prevState => !prevState),
    [],
  );

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const data = useMemo(
    () => ({
      isMenuOpen,
      setIsMenuOpen,
      toggleMenu,
      theme,
      toggleTheme,
      carts,
      setCarts,
      favourites,
      setFavourites,
    }),
    [
      carts,
      favourites,
      isMenuOpen,
      setCarts,
      setFavourites,
      theme,
      toggleMenu,
      toggleTheme,
    ],
  );

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
