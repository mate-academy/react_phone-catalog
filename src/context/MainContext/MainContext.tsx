/* eslint-disable @typescript-eslint/comma-dangle */
import React, { useState, useEffect, useMemo } from 'react';
import { PROJECT_NAME } from '../../variables';
import { fetchData } from '../../helpers/fetchData';
import { Product } from '../../types/Product';
import { CartItem } from '../../types/CartItem';
import { getFromStorage, setToStorage } from '../../helpers/Storage';

interface Props {
  children: React.ReactNode;
}

export const MainContext = React.createContext<{
  products: Product[];
  phones: Product[];
  tablets: Product[];
  accessories: Product[];
  favouritesItems: Product[];
  searchItems: Product[];
  cartItems: CartItem[];
  isLoaderActive: boolean;
  isMenuOpen: boolean;
  isHeaderSearchVisible: boolean;
  documentTitle: string;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setPhones: React.Dispatch<React.SetStateAction<Product[]>>;
  setTablets: React.Dispatch<React.SetStateAction<Product[]>>;
  setAccessories: React.Dispatch<React.SetStateAction<Product[]>>;
  setFavouritesItems: React.Dispatch<React.SetStateAction<Product[]>>;
  setSearchItems: React.Dispatch<React.SetStateAction<Product[]>>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setIsLoaderActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHeaderSearchVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDocumentTitle: React.Dispatch<React.SetStateAction<string>>;
}>({
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
  favouritesItems: [],
  searchItems: [],
  cartItems: [],
  isLoaderActive: true,
  isMenuOpen: false,
  isHeaderSearchVisible: false,
  documentTitle: 'Home Page',
  setProducts: () => {},
  setPhones: () => {},
  setTablets: () => {},
  setAccessories: () => {},
  setFavouritesItems: () => {},
  setSearchItems: () => {},
  setCartItems: () => {},
  setIsLoaderActive: () => {},
  setIsMenuOpen: () => {},
  setIsHeaderSearchVisible: () => {},
  setDocumentTitle: () => {},
});

export const MainProvider: React.FC<Props> = ({ children }) => {
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderSearchVisible, setIsHeaderSearchVisible] = useState(false);

  const [documentTitle, setDocumentTitle] = useState('Home Page');

  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [favouritesItems, setFavouritesItems] = useState<Product[]>([]);
  const [searchItems, setSearchItems] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setFavouritesItems(getFromStorage('favourites'));
    setCartItems(getFromStorage('cart'));
  }, []);

  useEffect(() => {
    const { body } = document;

    document.title = `${PROJECT_NAME} | ${documentTitle}`;
    body.style.overflow = isMenuOpen ? 'hidden' : '';

    setToStorage('favourites', favouritesItems);
    setToStorage('cart', cartItems);

    fetchData()
      .then((data: Product[]) => {
        setProducts(data);
        setPhones(data.filter(({ category }) => category === 'phones'));
        setTablets(data.filter(({ category }) => category === 'tablets'));
        setAccessories(
          data.filter(({ category }) => category === 'accessories')
        );
      })
      .finally(() => setIsLoaderActive(false));
  }, [documentTitle, isMenuOpen, favouritesItems, cartItems]);

  const value = useMemo(
    () => ({
      products,
      setProducts,
      phones,
      setPhones,
      tablets,
      setTablets,
      accessories,
      setAccessories,
      favouritesItems,
      setFavouritesItems,
      searchItems,
      setSearchItems,
      cartItems,
      setCartItems,
      isLoaderActive,
      setIsLoaderActive,
      isMenuOpen,
      setIsMenuOpen,
      isHeaderSearchVisible,
      setIsHeaderSearchVisible,
      documentTitle,
      setDocumentTitle,
    }),
    [
      products,
      setProducts,
      phones,
      setPhones,
      tablets,
      setTablets,
      accessories,
      setAccessories,
      favouritesItems,
      setFavouritesItems,
      searchItems,
      setSearchItems,
      cartItems,
      setCartItems,
      isLoaderActive,
      setIsLoaderActive,
      isMenuOpen,
      setIsMenuOpen,
      isHeaderSearchVisible,
      setIsHeaderSearchVisible,
      documentTitle,
      setDocumentTitle,
    ]
  );

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
