import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ProductCatalogItem } from './types/ProductCatalogItem';
import { getProducts } from './api/products';
import { HOME_CATEGORIES_LIST } from './modules/constants';
import type { Categories } from './types/Categories';

interface ProductContextType {
  products: ProductCatalogItem[];
  categories: Categories;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  reloadProducts: () => void;
}

export const ProductCatalogContext = createContext<ProductContextType>({
  products: [],
  categories: {},
  loading: false,
  loaded: false,
  error: false,
  reloadProducts: () => {},
});

export const ProductCatalogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<ProductCatalogItem[]>([]);
  const [categories, setCategories] = useState<Categories>({});
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const reloadProducts = useCallback(() => {
    setReloadTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setLoaded(false);
    getProducts()
      .then(loadedProducts => {
        setProducts(loadedProducts);
        const loadedCategories: Categories = {};
        for (const categoryName of HOME_CATEGORIES_LIST) {
          loadedCategories[categoryName] = loadedProducts.filter(
            product => product.category === categoryName,
          ).length;
        }

        setCategories(loadedCategories);
        setLoaded(true);
      })
      .catch(fetchError => {
        // eslint-disable-next-line no-console
        console.error(fetchError);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [reloadTrigger]);

  return (
    <ProductCatalogContext.Provider
      value={{ products, categories, loading, loaded, error, reloadProducts }}
    >
      {children}
    </ProductCatalogContext.Provider>
  );
};
