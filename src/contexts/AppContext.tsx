import {
  useState,
  createContext,
  ReactNode,
  useEffect,
  useContext,
  useRef,
  useMemo,
} from 'react';
import {
  getCartProducts,
  getFavouriteProducts,
  saveCartProducts,
  saveFavouriteProducts,
} from '../modules/shared/services/localStorage';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../types/Card';
import { getProducts } from '../modules/shared/services/productService';

type AppContextType = {
  favouriteProductsIds: string[];
  cartProductsIds: string[];
  isMenuOpen: boolean;
  products: Card[];
  setProducts: (products: Card[]) => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  setFavouriteProductsIds: (ids: string[]) => void;
  setCartProductsIds: (ids: string[]) => void;
  toggleFavouriteCard: (cardId: string) => void;
  toggleAddToCart: (cardId: string) => void;
  refCardWidth: React.MutableRefObject<HTMLDivElement | null>;
  refSliderWidth: React.MutableRefObject<HTMLDivElement | null>;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const AppContext = createContext<AppContextType>({
  favouriteProductsIds: [],
  cartProductsIds: [],
  isMenuOpen: false,
  products: [],
  setProducts: () => { },
  setIsMenuOpen: () => { },
  setFavouriteProductsIds: () => { },
  setCartProductsIds: () => { },
  toggleFavouriteCard: () => { },
  toggleAddToCart: () => { },
  refCardWidth: { current: null },
  refSliderWidth: { current: null },
  searchParams: new URLSearchParams(),
  setSearchParams: () => { },
  isLoading: false,
  setIsLoading: () => { },
});

type Props = {
  children: ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [favouriteProductsIds, setFavouriteProductsIds] = useState<string[]>(
    () => getFavouriteProducts(),
  );
  const [cartProductsIds, setCartProductsIds] = useState<string[]>(() =>
    getCartProducts(),
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const refCardWidth = useRef<HTMLDivElement | null>(null);
  const refSliderWidth = useRef<HTMLDivElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function toggleFavouriteCard(cardId: string) {
    if (favouriteProductsIds.includes(cardId)) {
      const updatedFavourites: string[] = favouriteProductsIds.filter(
        (id: string) => id !== cardId,
      );
      setFavouriteProductsIds(updatedFavourites);
      return;
    }

    setFavouriteProductsIds([...favouriteProductsIds, cardId]);
  }

  function toggleAddToCart(cardId: string) {
    if (cartProductsIds.includes(cardId)) {
      const updatedCart = cartProductsIds.filter((id: string) => id !== cardId);
      setCartProductsIds(updatedCart);
      return;
    }

    setCartProductsIds([...cartProductsIds, cardId]);
  }

  useEffect(() => {
    saveFavouriteProducts(favouriteProductsIds);
  }, [favouriteProductsIds]);

  useEffect(() => {
    saveCartProducts(cartProductsIds);
  }, [cartProductsIds]);

  const value = useMemo(() => ({
    favouriteProductsIds,
    cartProductsIds,
    isMenuOpen,
    products,
    setProducts,
    setIsMenuOpen,
    setFavouriteProductsIds,
    setCartProductsIds,
    toggleFavouriteCard,
    toggleAddToCart,
    refCardWidth,
    refSliderWidth,
    searchParams,
    setSearchParams,
    isLoading,
    setIsLoading,
  }), [
    favouriteProductsIds,
    cartProductsIds,
    isMenuOpen,
    products,
    searchParams,
    isLoading
  ])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      'useProductsContext must be used within a ProductsProvider',
    );
  }
  return context;
};
