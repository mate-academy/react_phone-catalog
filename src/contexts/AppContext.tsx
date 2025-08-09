import {
  useState,
  createContext,
  ReactNode,
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
import { useSearchParams } from 'react-router-dom';
import { Card } from '../types/Card';
import { getProducts } from '../modules/shared/services/productService';

type AppContextType = {
  favouriteProductsIds: number[];
  cartProductsIds: number[];
  isMenuOpen: boolean;
  products: Card[];
  setProducts: (products: Card[]) => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  setFavouriteProductsIds: (ids: number[]) => void;
  setCartProductsIds: (ids: number[]) => void;
  toggleFavouriteCard: (cardId: number) => void;
  toggleAddToCart: (cardId: number) => void;
  refCardWidth: React.MutableRefObject<HTMLDivElement | null>;
  refSliderWidth: React.MutableRefObject<HTMLDivElement | null>;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Card[]>([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  function toggleFavouriteCard(cardId: number) {
    if (favouriteProductsIds.includes(cardId)) {
      const updatedFavourites: number[] = favouriteProductsIds.filter(
        (id: number) => id !== cardId,
      );
      setFavouriteProductsIds(updatedFavourites);
      return;
    }

    setFavouriteProductsIds([...favouriteProductsIds, cardId]);
  }

  function toggleAddToCart(cardId: number) {
    if (cartProductsIds.includes(cardId)) {
      const updatedCart = cartProductsIds.filter((id: number) => id !== cardId);
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

  const value = {
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
  }

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
