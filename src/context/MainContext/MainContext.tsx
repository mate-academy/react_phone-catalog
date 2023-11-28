/* eslint-disable @typescript-eslint/comma-dangle */
import React, { useState, useEffect, useMemo } from 'react';
import { PROJECT_NAME } from '../../variables';
import { fetchData } from '../../helpers/fetchData';
import { Product } from '../../types/Product';

interface Props {
  children: React.ReactNode;
}

export const MainContext = React.createContext<{
  products: Product[];
  isLoaderActive: boolean;
  isMenuOpen: boolean;
  isHeaderSearchVisible: boolean;
  documentTitle: string;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setIsLoaderActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHeaderSearchVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDocumentTitle: React.Dispatch<React.SetStateAction<string>>;
}>({
  products: [],
  isLoaderActive: true,
  isMenuOpen: false,
  isHeaderSearchVisible: false,
  documentTitle: 'Home Page',
  setProducts: () => {},
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

  useEffect(() => {
    const { body } = document;

    document.title = `${PROJECT_NAME} | ${documentTitle}`;
    body.style.overflow = isMenuOpen ? 'hidden' : '';

    fetchData()
      .then((data) => setProducts(data))
      .finally(() => setIsLoaderActive(false));
  }, [documentTitle, isMenuOpen]);

  const value = useMemo(
    () => ({
      products,
      setProducts,
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
