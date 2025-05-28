import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { request } from '../../utils/fetchClient';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { Tablet } from '../../types/Tablet';
import { Phone } from '../../types/Phone';
import { Accessories } from '../../types/Accessories';

type GlobalContextType = {
  products: Product[];
  phoneItems: Phone[];
  tabletItems: Tablet[];
  accessoriesItems: Accessories[];
  isMenuClose: boolean;
  setIsMenuClose: (value: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  MOBILE_MAX_WIDTH: number;
  DESKTOP_MIN_WIDTH: number;
  cart: Product[];
  setCart: (cart: Product[]) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleCartItem: (product: Product) => void;
  clearCart: () => void;
  totalCartItems: number;
  totalCartPrice: number;
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  toggleFavoritesItem: (product: Product) => void;
  clearFavorites: () => void;
  totalFavoritesItems: number;
  totalFavoritesPrice: number;
  getProductCode: () => string;
  // errorMessage: string;
  // setErrorMessage: (message: string) => void;
};

export const GlobalContext = React.createContext<GlobalContextType>({
  products: [],
  phoneItems: [],
  tabletItems: [],
  accessoriesItems: [],
  isMenuClose: false,
  setIsMenuClose: () => {},
  selectedProduct: null,
  setSelectedProduct: () => {},
  MOBILE_MAX_WIDTH: 640,
  DESKTOP_MIN_WIDTH: 1200,
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  toggleCartItem: () => {},
  clearCart: () => {},
  totalCartItems: 0,
  totalCartPrice: 0,
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  toggleFavoritesItem: () => {},
  clearFavorites: () => {},
  totalFavoritesItems: 0,
  totalFavoritesPrice: 0,
  getProductCode: () => '',
  // errorMessage: '',
  // setErrorMessage: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }: Props) => {
  // const [errorMessage, setErrorMessage] = useState('');
  const [isMenuClose, setIsMenuClose] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [phoneItems, setPhoneItems] = useState<Phone[]>([]);
  const [tabletItems, setTabletItems] = useState<Tablet[]>([]);
  const [accessoriesItems, setAccessoriesItems] = useState<Accessories[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    toggleCartItem,
    clearCart,
    totalCartItems,
    totalCartPrice,
  } = useCart();
  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavoritesItem,
    clearFavorites,
    totalFavoritesItems,
    totalFavoritesPrice,
  } = useFavorites();

  const MOBILE_MAX_WIDTH = 640;
  const DESKTOP_MIN_WIDTH = 1200;

  // #region fetch data
  useEffect(() => {
    request('api/products.json')
      .then(response => {
        setProducts(response as Product[]);
      })
      .catch(() => {
        alert('Error fetching products');
      });
  }, []);

  useEffect(() => {
    request('api/phones.json')
      .then(response => {
        setPhoneItems(response as Phone[]);
      })
      .catch(() => {
        alert('Error fetching phones');
      });
  }, []);

  useEffect(() => {
    request('api/tablets.json')
      .then(response => {
        setTabletItems(response as Tablet[]);
      })
      .catch(() => {
        alert('Error fetching tablets');
      });
  }, []);

  useEffect(() => {
    request('api/accessories.json')
      .then(response => {
        setAccessoriesItems(response as Accessories[]);
      })
      .catch(() => {
        alert('Error fetching accessories');
      });
  }, []);

  // #endregion

  useEffect(() => {
    setIsMenuClose(true);
  }, []);

  const getProductCode = () => {
    const arr = String(selectedProduct?.id).split('');

    if (arr.length === 1) {
      arr.unshift('0');
    }

    for (let i = 0; i < 9 - arr.length; i++) {
      arr.unshift('0');
    }

    return arr.join('');
  };

  return (
    <GlobalContext.Provider
      value={{
        isMenuClose,
        setIsMenuClose,
        MOBILE_MAX_WIDTH,
        DESKTOP_MIN_WIDTH,
        products,

        cart,
        setCart,
        addToCart,
        removeFromCart,
        toggleCartItem,
        clearCart,
        totalCartItems,
        totalCartPrice,
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavoritesItem,
        clearFavorites,
        totalFavoritesItems,
        totalFavoritesPrice,
        selectedProduct,
        setSelectedProduct,
        phoneItems,
        tabletItems,
        accessoriesItems,
        getProductCode,
        // errorMessage,
        // setErrorMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
