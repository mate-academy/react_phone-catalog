import React, { useEffect, useState } from 'react';
import { Categories } from '../types/categories';
import { Product } from '../types/product';

type CatalogType = {
  products: Product[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | undefined>>;
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  categories: Categories[];
  elOnPage: number;
  currentPage: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
};

export const CatalogContext = React.createContext<CatalogType>({
  products: [],
  setProducts: () => {},
  loader: false,
  setLoader: () => {},
  error: '',
  setError: () => {},
  categories: [],
  elOnPage: 0,
  currentPage: 1,
  handleNextPage: () => {},
  handlePreviousPage: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[] | undefined>();
  const [elOnPage, setElOnPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const BASE_URL = 'https://hanna-balabukha.github.io/react_phone-catalog/api/';

  const productsUrl = BASE_URL + 'products.json';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(productsUrl);

        if (!response.ok) {
          throw new Error('Error');
        }

        const data = await response.json();

        setProducts(data);
      } catch (er) {
        setError('There are no products yet');
      }
    };

    fetchData();
  }, [productsUrl]);

  const categories: Categories[] = [
    {
      type: 'phones',
      items: [],
    },
    {
      type: 'tablets',
      items: [],
    },
    {
      type: 'accessories',
      items: [],
    },
  ];

  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 640px)').matches,
  );

  useEffect(() => {
    window
      .matchMedia('(min-width: 640px)')
      .addEventListener('change', e => setMatches(e.matches));
  }, []);

  useEffect(() => {
    const countQuantity = () => {
      if (!matches) {
        setElOnPage(2);
      } else {
        setElOnPage(4);
      }
    };

    countQuantity()
  }, [matches])
  
  const handleNextPage = () => {
    const updatedPage = currentPage + 1;

    setCurrentPage(updatedPage);
  };

  const handlePreviousPage = () => {
    const updatedPage = currentPage - 1;

    setCurrentPage(updatedPage);
  };

  const value = {
    products,
    setProducts,
    categories,
    elOnPage,
    currentPage,
    handleNextPage,
    handlePreviousPage,
    loader,
    setLoader,
    error,
    setError,
  };

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
};
