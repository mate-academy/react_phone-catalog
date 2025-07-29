import {
  createContext,
  FC,
  ReactNode,
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
import { getProducts } from '../services/product.service';

type GlobalContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  fetchProducts: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMenu: () => void;
  theme: Theme;
  toggleTheme: () => void;
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
  isInCart: (currentProduct: Product) => boolean;
  addToCart: (currentProduct: Product) => void;
  favourites: Product[];
  setFavourites: React.Dispatch<React.SetStateAction<Product[]>>;
  isInFavourites: (currentProduct: Product) => boolean;
  toggleFavourites: (currentProduct: Product) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  products: [],
  setProducts: () => {},
  fetchProducts: async () => {},
  isLoading: false,
  setIsLoading: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  toggleMenu: () => {},
  theme: 'dark',
  toggleTheme: () => {},
  cart: [],
  setCart: () => {},
  isInCart: () => false,
  addToCart: () => {},
  favourites: [],
  setFavourites: () => {},
  isInFavourites: () => false,
  toggleFavourites: () => {},
});

type Props = {
  children: ReactNode;
};

export const GlobalProvider: FC<Props> = ({ children }) => {
  //#region THEME
  const { theme, toggleTheme } = useTheme();
  //#endregion

  //#region PRODUCTS
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    setErrorMessage('');

    const delayTimer = setTimeout(() => setIsLoading(true), 200);

    try {
      const data = await getProducts();

      setProducts(data);
    } catch (err) {
      setErrorMessage('Failed to load products');
    } finally {
      clearTimeout(delayTimer);
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  //#endregion

  //#region MENU
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(
    () => setIsMenuOpen(prevState => !prevState),
    [],
  );
  //#endregion

  //#region FAVOURITES
  const [favourites, setFavourites] = useLocalStorage<Product[]>(
    'favourites',
    [],
  );

  const isInFavourites = useCallback(
    (currentProduct: Product) =>
      favourites.some(favItem => favItem.itemId === currentProduct.itemId),
    [favourites],
  );

  const toggleFavourites = useCallback(
    (currentProduct: Product) => {
      setFavourites(prevFavourites => {
        if (isInFavourites(currentProduct)) {
          return prevFavourites.filter(
            favItem => favItem.itemId !== currentProduct.itemId,
          );
        } else {
          return [...prevFavourites, currentProduct];
        }
      });
    },
    [setFavourites, isInFavourites],
  );
  //#endregion

  //#region CART
  const [cart, setCart] = useLocalStorage<Cart[]>('cart', []);

  const isInCart = useCallback(
    (currentProduct: Product) =>
      cart.some(item => item.id === currentProduct.itemId),
    [cart],
  );

  const addToCart = useCallback(
    (currentProduct: Product) => {
      if (!isInCart(currentProduct)) {
        const newCartItem: Cart = {
          id: currentProduct.itemId,
          quantity: 1,
          product: currentProduct,
        };

        setCart(prevCart => [...prevCart, newCartItem]);
      }
    },
    [isInCart, setCart],
  );
  //#endregion

  const data = useMemo(
    () => ({
      products,
      setProducts,
      fetchProducts,
      isLoading,
      setIsLoading,
      errorMessage,
      setErrorMessage,
      isMenuOpen,
      setIsMenuOpen,
      toggleMenu,
      theme,
      toggleTheme,
      cart,
      setCart,
      isInCart,
      addToCart,
      favourites,
      setFavourites,
      isInFavourites,
      toggleFavourites,
    }),
    [
      products,
      isLoading,
      errorMessage,
      isMenuOpen,
      toggleMenu,
      theme,
      toggleTheme,
      cart,
      setCart,
      isInCart,
      addToCart,
      favourites,
      setFavourites,
      isInFavourites,
      toggleFavourites,
    ],
  );

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
