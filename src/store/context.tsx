import React, { useMemo, ReactNode, useState, useCallback } from 'react';
import { createContext } from 'react';
import { getProducts } from '../api/products';
import { Product } from '../types/Product';
import { ProductInfo } from '../types/ProductInfo';
import { getPhones } from '../api/phones';
import { getTablets } from '../api/tablets';
import { getAccessories } from '../api/accessories';

type ProductType = 'products' | 'phones' | 'tablets' | 'accessories';

interface AppContextType {
  products: Product[];
  phones: ProductInfo[];
  tablets: ProductInfo[];
  accessories: ProductInfo[];
  loading: Record<ProductType, boolean>;
  fetchProducts: (type: ProductType) => void;
}

export const AppContext = createContext<AppContextType>({
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
  loading: {
    products: false,
    phones: false,
    tablets: false,
    accessories: false,
  },
  fetchProducts: () => {},
});

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<Record<ProductType, boolean>>({
    products: false,
    phones: false,
    tablets: false,
    accessories: false,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<ProductInfo[]>([]);
  const [tablets, setTablets] = useState<ProductInfo[]>([]);
  const [accessories, setAccessories] = useState<ProductInfo[]>([]);

  const fetchProducts = useCallback(async (type: ProductType) => {
    setLoading(prev => ({ ...prev, [type]: true }));
    try {
      if (type === 'phones') {
        const phonesData = await getPhones();

        setPhones(phonesData);
      } else if (type === 'tablets') {
        const tabletsData = await getTablets();

        setTablets(tabletsData);
      } else if (type === 'accessories') {
        const accessoriesData = await getAccessories();

        setAccessories(accessoriesData);
      } else {
        const productsData = await getProducts();

        setProducts(productsData);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error fetching ${type}:`, error);
    } finally {
      setLoading(prev => ({ ...prev, [type]: false }));
    }
  }, []);

  const value = useMemo(
    () => ({
      products,
      phones,
      tablets,
      loading,
      accessories,
      fetchProducts,
    }),
    [products, phones, tablets, loading, accessories, fetchProducts],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
