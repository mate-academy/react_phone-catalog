import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ProductsContextValue } from '../types/ContextValues';
import { useSearchParams } from 'react-router-dom';
import { SortOptions } from '../types/SortOptions';
import { Product } from '../types/Product';
import { getProducts } from '../utils/getData';
import { ProductsCategory } from '../types/ProductsCategory';

export const ProductsContext = createContext<ProductsContextValue | null>(null);

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');

  const sortProducts = useCallback(
    (productsToSort: Product[]) => {
      return [...productsToSort].sort((a: Product, b: Product) => {
        switch (sort) {
          case SortOptions.CHEAPEST:
            return a.price - b.price;
          case SortOptions.ALPABETICALLY:
            return a.name.localeCompare(b.name);
          default:
            return b.year - a.year;
        }
      });
    },
    [sort],
  );

  const loadProducts = useCallback((productsCategory: ProductsCategory) => {
    setIsLoading(true);
    setIsError(false);

    getProducts()
      .then(productsFromServer => {
        if (productsFromServer.length > 0) {
          const selectedProducts = productsFromServer.filter(
            product => product.category === productsCategory,
          );

          setProducts(selectedProducts);
        }
      })
      .catch(() => {
        setIsError(true);

        throw new Error('Something went wrong while downloading Products');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const sortedProduct = sortProducts(products);

  const productsValues = useMemo(
    () => ({
      sortedProduct,
      products,
      isLoading,
      isError,
      setIsLoading,
      loadProducts,
    }),
    [sortedProduct, products, isLoading, isError, setIsLoading, loadProducts],
  );

  return (
    <ProductsContext.Provider value={productsValues}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useValues = () => {
  const value = useContext(ProductsContext);

  if (!value) {
    throw new Error('Something is wrong with provider ProductsContext');
  }

  return value;
};
