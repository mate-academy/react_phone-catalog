import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getProducts } from '../helpers/products';
import { Category } from '../types/Category';
import { Errors } from '../types/Errors';
import { Product } from '../types/Product';

type AppContextType = {
  products: Product[];
  phonesCount: string;
  tabletsCount: string;
  accessoriesCount: string;
  brandNewProducts: Product[];
  hotPriceProducts: Product[];
  isLoading: boolean;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  removeError: (t?: number) => void;
  getCategoryItems: (category: Category) => Product[];
};

export const AppContext = React.createContext<AppContextType>({
  products: [],
  phonesCount: '',
  tabletsCount: '',
  accessoriesCount: '',
  brandNewProducts: [],
  hotPriceProducts: [],
  isLoading: false,
  errorMessage: '',
  setErrorMessage: () => {},
  removeError: () => {},
  getCategoryItems: () => [],
});

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const removeError = (time = 3000) => {
    setTimeout(() => {
      setErrorMessage('');
    }, time);
  };

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .catch(() => {
        setErrorMessage(Errors.loadingProducts);
        removeError();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const brandNewProducts = useMemo(() => {
    return [...products]
      .sort((prod1, prod2) => prod2.year - prod1.year)
      .sort((prod1, prod2) => prod2.price - prod1.price);
  }, [products]);

  const hotPriceProducts = useMemo(() => {
    return [...products].sort((prod1, prod2) => {
      const discoutValue1 = prod1.fullPrice - prod1.price;
      const discoutValue2 = prod2.fullPrice - prod2.price;

      return discoutValue2 - discoutValue1;
    });
  }, [products]);

  const getCategoryItems = useCallback(
    (category: Category) => {
      return [...products].filter((item) => item.category === category);
    },
    [products],
  );

  const getCategoryCount = useCallback(
    (category: Category) => {
      const countedItems = getCategoryItems(category);

      return countedItems.length === 1
        ? `${countedItems.length} model`
        : `${countedItems.length} models`;
    },
    [getCategoryItems],
  );

  const phonesCount = getCategoryCount(Category.phone);
  const tabletsCount = getCategoryCount(Category.tablet);
  const accessoriesCount = getCategoryCount(Category.accessory);

  const value = {
    products,
    phonesCount,
    tabletsCount,
    accessoriesCount,
    brandNewProducts,
    isLoading,
    errorMessage,
    setErrorMessage,
    removeError,
    hotPriceProducts,
    getCategoryItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useProducts = () => useContext(AppContext);
