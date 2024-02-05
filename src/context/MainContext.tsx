import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../helpers/getProducts';
import { CartItem } from '../types/CartItem';
import { getFromStorage, setToStorage } from '../helpers/storage';

type Props = {
  children: React.ReactNode;
};

export const MainContext = React.createContext<{
  currentPage: string;
  products: Product[];
  phones: Product[];
  tablets: Product[];
  accessories: Product[];
  sortType: string;
  itemsOnPage: string;
  cartItems: CartItem[];
  favoutitesItems: Product[];
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setPhones: React.Dispatch<React.SetStateAction<Product[]>>;
  setTablets: React.Dispatch<React.SetStateAction<Product[]>>;
  setAccessories: React.Dispatch<React.SetStateAction<Product[]>>;
  setSortType: React.Dispatch<React.SetStateAction<string>>;
  setItemsOnPage: React.Dispatch<React.SetStateAction<string>>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setFavouritesItems: React.Dispatch<React.SetStateAction<Product[]>>
}>({
  currentPage: 'Home',
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
  sortType: 'No sorting',
  itemsOnPage: 'All',
  cartItems: [],
  favoutitesItems: [],
  setCurrentPage: () => { },
  setProducts: () => { },
  setPhones: () => { },
  setTablets: () => { },
  setAccessories: () => { },
  setSortType: () => { },
  setItemsOnPage: () => { },
  setCartItems: () => { },
  setFavouritesItems: () => { },
});

export const MainProvider: React.FC<Props> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [sortType, setSortType] = useState('No sorting');
  const [itemsOnPage, setItemsOnPage] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favoutitesItems, setFavouritesItems] = useState<Product[]>([]);

  const getProductsFromServer = async () => {
    try {
      const data = await getProducts();

      setProducts(data);
      setPhones(data.filter((item) => item.category === 'phones'));
      setTablets(data.filter((item) => item.category === 'tablets'));
      setAccessories(data.filter((item) => item.category === 'accessories'));
    } catch {
      // eslint-disable-next-line no-console
      console.warn('products loading error!');
    }
  };

  useEffect(() => {
    getProductsFromServer();
    setCartItems(getFromStorage('cart'));
    setFavouritesItems(getFromStorage('favourites'));
  }, []);

  useEffect(() => {
    setToStorage('cart', cartItems);
    setToStorage('favourites', favoutitesItems);
  }, [cartItems, favoutitesItems]);

  const value = useMemo(
    () => ({
      currentPage,
      setCurrentPage,
      products,
      setProducts,
      phones,
      setPhones,
      tablets,
      setTablets,
      accessories,
      setAccessories,
      sortType,
      setSortType,
      itemsOnPage,
      setItemsOnPage,
      cartItems,
      setCartItems,
      favoutitesItems,
      setFavouritesItems,
    }),
    [
      currentPage,
      setCurrentPage,
      products,
      setProducts,
      phones,
      setPhones,
      tablets,
      setTablets,
      accessories,
      setAccessories,
      sortType,
      setSortType,
      itemsOnPage,
      setItemsOnPage,
      cartItems,
      setCartItems,
      favoutitesItems,
      setFavouritesItems,
    ],
  );

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
