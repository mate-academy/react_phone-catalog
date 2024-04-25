import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Categories } from '../types/categories';
import { Category } from '../types/category';
import { Product } from '../types/product';

type CatalogType = {
  products: Product[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | undefined>>;
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  prodCategories: Categories[];
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
  prodCategories: [],
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
  // const [phones, setPhones] = useState<TabAccessPhone[]>();
  // const [tablets, setTablets] = useState<TabAccessPhone[]>();
  // const [accessories, setAccessories] = useState<TabAccessPhone[]>();
  const [elOnPage, setElOnPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const BASE_URL = 'https://hanna-balabukha.github.io/react_phone-catalog/api/';

  const productsUrl = BASE_URL + 'products.json';
  // const phoneUrl = BASE_URL + 'phones.json';
  // const tabletsUrl = BASE_URL + 'tablets.json';
  // const accessoriesUrl = BASE_URL + 'accessories.json';

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

  const getCategory = useCallback((category: Category) => {
    const items = products?.filter((item) => item.category === category);

    return items;
  }, [products]);

  const phones = getCategory(Category.Phones);
  const tablets = getCategory(Category.Tablets);
  const accessories = getCategory(Category.Accessories);

  const prodCategories = useMemo(() => ([
    {
      type: 'phones',
      items: phones,
    },
    {
      type: 'tablets',
      items: tablets,
    },
    {
      type: 'accessories',
      items: accessories,
    },
  ]), [phones, tablets, accessories]);

  console.log(phones)


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
    prodCategories,
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
