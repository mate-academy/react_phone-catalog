import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { AllProducts } from '../types/AllProducts/AllProducts';
import { Product } from '../types/Product/Product';

import { getAllProducts } from '../services/apiServices';

type AnyProduct = AllProducts[] | Product[];

interface ProductContextType {
  data: {
    [key: string]: AnyProduct;
  };
  loading: boolean;
  error: string;
  loadProduct: (category: string) => void;
}

type Props = {
  children: React.ReactNode;
};

export const ProductContext = React.createContext<ProductContextType>({
  data: {},
  loading: false,
  error: '',
  loadProduct: () => {},
});

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<{ [key: string]: AnyProduct }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { pathname } = useLocation();

  const loadProduct = async (category: string) => {
    setLoading(true);
    setError('');

    try {
      let products: AnyProduct = [];

      if (category === '/') {
        const res = await getAllProducts('/products.json');

        products = res.data;
        setData(prevData => ({ ...prevData, all: products }));
      } else {
        const res = await getAllProducts(`${category}.json`);

        products = res.data;

        setData(prevData => ({ ...prevData, [category]: products }));
      }
    } catch {
      setError('Something get wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const key = pathname === '/' ? 'all' : pathname;

    if (!data[key]) {
      loadProduct(pathname);
    }
  }, [pathname, data]);

  const value = {
    data,
    loading,
    error,
    loadProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
