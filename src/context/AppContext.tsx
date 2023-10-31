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
  hotPriceProducts: Product[],
  isLoading: boolean,
  getCategoryItems: (category: Category) => Product[],
};

export const AppContext = React.createContext<AppContextType>({
  products: [],
  phonesCount: '',
  tabletsCount: '',
  accessoriesCount: '',
  brandNewProducts: [],
  hotPriceProducts: [],
  isLoading: false,
  getCategoryItems: () => [],
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

  const hotPriceProducts = [...products]
    .sort((prod1, prod2) => {
      const discoutValue1 = (prod1.fullPrice - prod1.price);
      const discoutValue2 = (prod2.fullPrice - prod2.price);

      return discoutValue2 - discoutValue1;
    });

  const getCategoryItems = useCallback((category: Category) => {
    return [...products].filter(item => item.category === category);
  }, [products]);

  const getCategoryCount = useCallback((category: Category) => {
    const countedItems = getCategoryItems(category);

    return countedItems.length === 1
      ? `${countedItems.length} model`
      : `${countedItems.length} models`;
  }, [getCategoryItems]);

  // const phones = getCategoryItems(Category.phone);
  // const tablets = getCategoryItems(Category.tablet);
  // const accessories = getCategoryItems(Category.accessory);

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
    hotPriceProducts,
    getCategoryItems,
  });

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
