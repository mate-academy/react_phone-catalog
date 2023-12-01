import React, { useCallback, useEffect, useState } from 'react';
import { Product } from '../type/Product';
import { Category } from '../type/Category';
import { getHotPriceProducts } from '../utils/utils';
import { BASE_API_URL } from '../helpers/fetchClient';

export { BASE_API_URL } from '../helpers/fetchClient';

type Props = {
  children: React.ReactNode;
};

type AppContextType = {
  products: Product[],
  phonesCount: string,
  tabletsCount: string,
  accessoriesCount: string,
  hotPriceProducts: Product[],
  fetchProducts: () => void,
  getPhones: () => void,
};

export const AppContext = React.createContext<AppContextType>({
  products: [],
  phonesCount: '',
  tabletsCount: '',
  accessoriesCount: '',
  hotPriceProducts: [],
  fetchProducts: () => {},
  getPhones: () => {},
});

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);

  const fetchProducts = () => {
    fetch(BASE_API_URL)
      .then(response => response.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getPhones = () => {
    fetch(BASE_API_URL)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      });
  };

  useEffect(() => {
    const filteredProducts = products
      .filter(item => item.price > 0);
    const hotPrice = filteredProducts.length > 0
      ? getHotPriceProducts(filteredProducts)
      : [];

    setHotPriceProducts(hotPrice);
  }, [products]);

  const getCategoryCount = useCallback((category: Category) => {
    const countedItems = products
      .filter(item => item.category === category).length;

    return countedItems === 1
      ? `${countedItems} model`
      : `${countedItems} models`;
  }, [products]);

  const phonesCount = getCategoryCount(Category.Phones);
  const tabletsCount = getCategoryCount(Category.Tablets);
  const accessoriesCount = getCategoryCount(Category.Accessories);

  const value = ({
    products,
    phonesCount,
    tabletsCount,
    accessoriesCount,
    hotPriceProducts,
    fetchProducts,
    getPhones,
  });

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
