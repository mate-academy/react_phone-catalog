import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  getAccessories,
  getPhones,
  getProducts,
  getSuggestedProducts,
  getTablets,
} from '../api';
import { Product } from '../types/Product';
import { Accessory, Phone, Tablet } from '../types/ProductDetails';

export const ProductsContext = React.createContext({
  products: [] as Product[],
  phones: [] as Phone[],
  accessories: [] as Accessory[],
  tablets: [] as Tablet[],
  suggestedProducts: [] as Product[],
  loading: false,
  error: '',
});

interface Props {
  children: React.ReactNode;
}

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          fetchedProducts,
          fetchedPhones,
          fetchedAccessories,
          fetchedTablets,
          fetchedSuggestedProducts,
        ] = await Promise.all([
          getProducts(),
          getPhones(),
          getAccessories(),
          getTablets(),
          getSuggestedProducts(),
        ]);

        setProducts(fetchedProducts);
        setPhones(fetchedPhones);
        setAccessories(fetchedAccessories);
        setTablets(fetchedTablets);
        setSuggestedProducts(fetchedSuggestedProducts);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const value = useMemo(
    () => ({
      products,
      phones,
      accessories,
      tablets,
      loading,
      error,
      suggestedProducts,
    }),
    [products, phones, accessories, tablets, loading, error, suggestedProducts],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductsContext);
};
