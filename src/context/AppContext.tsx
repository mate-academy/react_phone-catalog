import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { getProducts } from '../helpers/products';
import { Category } from '../types/Category';
import { Product } from '../types/Product';

type AppContextType = {
  products: Product[],
  phonesCount: string,
  tabletsCount: string,
  accessoriesCount: string,
  brandNewProducts: Product[],
  isLoading: boolean,
};

export const AppContext = React.createContext<AppContextType>({
  products: [],
  phonesCount: '',
  tabletsCount: '',
  accessoriesCount: '',
  brandNewProducts: [],
  isLoading: false,
});

type Props = {
  children: React.ReactNode,
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .catch(() => {
        // setErrorMessage('Error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const brandNewProducts = [...products]
    .sort((prod1, prod2) => prod2.year - prod1.year)
    .sort((prod1, prod2) => prod2.price - prod1.price);

  const getCategoryCount = useCallback((category: Category) => {
    const countedItems = [...products]
      .filter(item => item.category === category);

    return countedItems.length === 1
      ? `${countedItems.length} model`
      : `${countedItems.length} models`;
  }, [products]);

  const phonesCount = getCategoryCount(Category.phone);
  const tabletsCount = getCategoryCount(Category.tablet);
  const accessoriesCount = getCategoryCount(Category.accessory);

  const value = ({
    products,
    phonesCount,
    tabletsCount,
    accessoriesCount,
    brandNewProducts,
    isLoading,
  });

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
