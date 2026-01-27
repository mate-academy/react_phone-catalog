import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import type { CategoryName } from './types/Categories';
import { getProductDetails } from './api/productDetail';
import { ProductDetail } from './types/ProductDetail';

type Products = Record<CategoryName, ProductDetail[]>;

interface ProductDetailContextType {
  products: Products;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  reloadProducts: (currentCategory: CategoryName) => void;
}

export const ProductDetailContext = createContext<ProductDetailContextType>({
  products: {},
  loading: false,
  loaded: false,
  error: false,
  reloadProducts: () => {},
});

export const ProductDetailProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<Products>({});
  const [currentCategory, setCurrentCategory] = useState<CategoryName>('');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const reloadProducts = useCallback((category: CategoryName) => {
    setLoading(false);
    setLoaded(false);
    setError(false);
    setCurrentCategory(category);
    setReloadTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (!currentCategory) {
      return;
    }

    setLoading(true);
    setError(false);
    setLoaded(false);
    getProductDetails(currentCategory)
      .then(loadedProductDetails => {
        setProducts(prevProducts => {
          return { ...prevProducts, [currentCategory]: loadedProductDetails };
        });
        setLoaded(true);
      })
      .catch(fetchError => {
        // eslint-disable-next-line no-console
        console.error(fetchError);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [currentCategory, reloadTrigger]);

  return (
    <ProductDetailContext.Provider
      value={{ products, loading, loaded, error, reloadProducts }}
    >
      {children}
    </ProductDetailContext.Provider>
  );
};
