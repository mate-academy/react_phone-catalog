import React from 'react';
import { getProducts } from './api';
import { Product, CartProductType } from './typies';

type AppContextTypes = {
  getProducts: () => Promise<Product[]>;
  products: Product[] | null;
  setProducts: (products: Product[]) => void;
  isMobileMenu: boolean;
  setIsMobileMenu: (state: boolean) => void;
  isSearch: boolean;
  setIsSearch: (state: boolean) => void;
  search: string;
  setSearch: (query: string) => void;
  FAVOURITES_LOCAL_STORAGE_ITEM: string;
  favouriteProducts: Product[];
  setFavouriteProducts: (products: Product[]) => void;
  CART_LOCAL_STORAGE_ITEM: string;
  cart: CartProductType[];
  setCart: (products: CartProductType[]) => void;
  removeProductFromCart: (productId: number) => void;
  isError: boolean;
};

export const AppContext = React.createContext({} as AppContextTypes);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [products, setProducts] = React.useState<Product[] | null>(null);
  const [isMobileMenu, setIsMobileMenu] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  const FAVOURITES_LOCAL_STORAGE_ITEM = 'favourites';
  const [favouriteProducts, setFavouriteProducts] = React.useState<Product[]>(
    [],
  );

  const CART_LOCAL_STORAGE_ITEM = 'cart';
  const [cart, setCart] = React.useState<CartProductType[]>([]);

  React.useEffect(() => {
    getProducts()
      .then(productsList => {
        setProducts(productsList);
        setIsError(false);
      })
      .catch(() => setIsError(true));

    const favourites = localStorage.getItem(FAVOURITES_LOCAL_STORAGE_ITEM);

    if (favourites) {
      setFavouriteProducts(JSON.parse(favourites));
    } else {
      localStorage.setItem(FAVOURITES_LOCAL_STORAGE_ITEM, '[]');
      setFavouriteProducts([]);
    }

    const cartItems = localStorage.getItem(CART_LOCAL_STORAGE_ITEM);

    if (cartItems) {
      setCart(JSON.parse(cartItems));
    } else {
      localStorage.setItem(CART_LOCAL_STORAGE_ITEM, '[]');
      setCart([]);
    }
  }, []);

  const removeProductFromCart = (productId: number) => {
    const cartStorage = localStorage.getItem(CART_LOCAL_STORAGE_ITEM);

    if (cartStorage) {
      const parsingCart = JSON.parse(cartStorage).filter(
        (item: CartProductType) => item.id !== productId,
      );

      localStorage.setItem(
        CART_LOCAL_STORAGE_ITEM,
        JSON.stringify(parsingCart),
      );

      setCart(parsingCart);
    }
  };

  const value = {
    getProducts,
    products,
    setProducts,
    isMobileMenu,
    setIsMobileMenu,
    isSearch,
    setIsSearch,
    search,
    setSearch,
    FAVOURITES_LOCAL_STORAGE_ITEM,
    favouriteProducts,
    setFavouriteProducts,
    CART_LOCAL_STORAGE_ITEM,
    cart,
    setCart,
    removeProductFromCart,
    isError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
