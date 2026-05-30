import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../types/Product';
import { Cart } from '../types/Cart';
import { getAllProducts } from '../utils/api';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../hooks/useTheme';
import { Theme } from '../types';

type GlobalContextType = {
  allProducts: Product[];
  setAllProducts: Dispatch<SetStateAction<Product[]>>;
  cart: Cart[];
  setCart: Dispatch<SetStateAction<Cart[]>>;
  favorites: Product[];
  setFavorites: Dispatch<SetStateAction<Product[]>>;
  updateQuantity: (id: string, newQuantity: number) => void;
  clearShoppingCart: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  toggleMenu: () => void;
  toggleFavorites: (currentProduct: Product) => void;
  addToCart: (currentProduct: Product) => void;
  theme: Theme;
  toggleTheme: () => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  allProducts: [] as Product[],
  setAllProducts: () => {},
  cart: [] as Cart[],
  setCart: () => {},
  favorites: [] as Product[],
  setFavorites: () => {},
  updateQuantity: () => {},
  clearShoppingCart: () => {},
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  toggleMenu: () => {},
  toggleFavorites: () => {},
  addToCart: () => {},
  theme: 'light',
  toggleTheme: () => {},
});

type Props = {
  children: ReactNode;
};

export const GlobalProvider: FC<Props> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [cart, setCart] = useLocalStorage<Cart[]>('shoppingCart', []);
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getAllProducts().then(fetchedProducts => setAllProducts(fetchedProducts));
  }, []);

  const updateQuantity = useCallback(
    (id: string, newQuantity: number) => {
      setCart(prevCart =>
        prevCart
          .map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item,
          )
          .filter(item => item.quantity > 0),
      );
    },
    [setCart],
  );

  const toggleMenu = useCallback(
    () => setIsMenuOpen(prevState => !prevState),
    [],
  );

  useEffect(() => {
    const overflowStyle = isMenuOpen ? 'hidden' : 'auto';

    document.body.style.overflow = overflowStyle;

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const addToCart = useCallback(
    (product: Product) => {
      if (product) {
        const isInCart = cart.some(
          item => item.product.itemId === product.itemId,
        );

        if (!isInCart) {
          const newProduct: Cart = {
            id: product.itemId,
            quantity: 1,
            product: product,
          };

          setCart(prevCart => [...prevCart, newProduct]);
        }
      }
    },
    [cart, setCart],
  );

  const toggleFavorites = useCallback(
    (currentProduct: Product) => {
      const isInFavorites = favorites.some(
        item => item.itemId === currentProduct.itemId,
      );

      setFavorites(prevFavorites => {
        if (isInFavorites) {
          return prevFavorites.filter(
            item => item.itemId !== currentProduct.itemId,
          );
        } else {
          return [...prevFavorites, currentProduct];
        }
      });
    },
    [favorites, setFavorites],
  );

  const clearShoppingCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const data = useMemo(
    () => ({
      allProducts,
      setAllProducts,
      cart,
      setCart,
      favorites,
      setFavorites,
      updateQuantity,
      clearShoppingCart,
      isMenuOpen,
      setIsMenuOpen,
      toggleMenu,
      toggleFavorites,
      addToCart,
      theme,
      toggleTheme,
    }),
    [
      allProducts,
      cart,
      favorites,
      setAllProducts,
      setCart,
      setFavorites,
      clearShoppingCart,
      updateQuantity,
      isMenuOpen,
      setIsMenuOpen,
      toggleMenu,
      toggleFavorites,
      addToCart,
      theme,
      toggleTheme,
    ],
  );

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};
