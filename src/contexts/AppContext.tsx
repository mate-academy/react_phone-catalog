import {
  useState,
  createContext,
  ReactNode,
  useMemo,
  useEffect,
  useContext,
  useRef,
} from 'react';
import {
  getCartProducts,
  getFavouriteProducts,
  saveCartProducts,
  saveFavouriteProducts,
} from '../modules/shared/services/localStorage';

type AppContextType = {
  favouriteProductsIds: number[];
  cartProductsIds: number[];
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  setFavouriteProductsIds: (ids: number[]) => void;
  setCartProductsIds: (ids: number[]) => void;
  generateProductCode: (name: string) => string;
  toggleFavouriteCard: (cardId: number) => void;
  toggleAddToCart: (cardId: number) => void;
  refCardWidth: React.MutableRefObject<HTMLDivElement | null>;
  refSliderWidth: React.MutableRefObject<HTMLDivElement | null>;
};

export const AppContext = createContext<AppContextType>({
  favouriteProductsIds: [],
  cartProductsIds: [],
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  setFavouriteProductsIds: () => {},
  setCartProductsIds: () => {},
  generateProductCode: () => '',
  toggleFavouriteCard: () => {},
  toggleAddToCart: () => {},
  refCardWidth: { current: null },
  refSliderWidth: { current: null },
});

type Props = {
  children: ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [favouriteProductsIds, setFavouriteProductsIds] = useState<number[]>(
    () => getFavouriteProducts(),
  );
  const [cartProductsIds, setCartProductsIds] = useState<number[]>(() =>
    getCartProducts(),
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const refCardWidth = useRef<HTMLDivElement | null>(null);
  const refSliderWidth = useRef<HTMLDivElement | null>(null);

  function generateProductCode(name: string): string {
    return name.includes('14') ? name + ` (MQ023)` : name + ' (iMT9G2FS/A)';
  }

  function toggleFavouriteCard(cardId: number) {
    if (favouriteProductsIds.includes(cardId)) {
      const updatedFavourites = favouriteProductsIds.filter(
        (id: number) => id !== cardId,
      );
      saveFavouriteProducts(updatedFavourites);
      setFavouriteProductsIds(updatedFavourites);
      return;
    }

    const updatedFavourites = [...favouriteProductsIds, cardId];
    saveFavouriteProducts(updatedFavourites);
    setFavouriteProductsIds(updatedFavourites);
  }

  function toggleAddToCart(cardId: number) {
    if (cartProductsIds.includes(cardId)) {
      const updatedCart = cartProductsIds.filter((id: number) => id !== cardId);
      saveCartProducts(updatedCart);
      setCartProductsIds(updatedCart);
      return;
    }

    const updatedCart = [...cartProductsIds, cardId];
    saveCartProducts(updatedCart);
    setCartProductsIds(updatedCart);
  }

  useEffect(() => {
    saveFavouriteProducts(favouriteProductsIds);
  }, [favouriteProductsIds]);

  useEffect(() => {
    saveCartProducts(cartProductsIds);
  }, [cartProductsIds]);

  const value = useMemo<AppContextType>(
    () => ({
      favouriteProductsIds,
      cartProductsIds,
      isMenuOpen,
      setIsMenuOpen,
      setFavouriteProductsIds,
      setCartProductsIds,
      generateProductCode,
      toggleFavouriteCard,
      toggleAddToCart,
      refCardWidth,
      refSliderWidth,
    }),
    [favouriteProductsIds, cartProductsIds, isMenuOpen],
  );

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
