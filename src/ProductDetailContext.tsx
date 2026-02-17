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
export type Status = 'loading' | 'loaded' | 'error';
type Statuses = Record<CategoryName, Status>;

interface ProductDetailContextType {
  products: Products;
  statuses: Statuses;
  reloadProducts: (currentCategory: CategoryName) => void;
}

export const ProductDetailContext = createContext<ProductDetailContextType>({
  products: {},
  statuses: {},
  reloadProducts: () => {},
});

export const ProductDetailProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<Products>({});
  const [statuses, setStatuses] = useState<Statuses>({});
  const [currentCategory, setCurrentCategory] = useState<CategoryName>('');
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const reloadProducts = useCallback((category: CategoryName) => {
    setStatuses(prevStatuses => ({ ...prevStatuses, category: 'loading' }));
    setReloadTrigger(prev => prev + 1);
    setCurrentCategory(category);
  }, []);

  useEffect(() => {
    if (!currentCategory) {
      return;
    }

    getProductDetails(currentCategory)
      .then(loadedProductDetails => {
        setStatuses(prevStatuses => ({
          ...prevStatuses,
          [currentCategory]: 'loaded',
        }));
        setProducts(prevProducts => {
          return { ...prevProducts, [currentCategory]: loadedProductDetails };
        });
      })
      .catch(fetchError => {
        // eslint-disable-next-line no-console
        console.error(fetchError);
        setProducts(prevProducts => {
          return { ...prevProducts, [currentCategory]: [] };
        });
        setStatuses(prevStatuses => ({ ...prevStatuses, category: 'error' }));
      });
  }, [reloadTrigger, currentCategory]);

  return (
    <ProductDetailContext.Provider
      value={{ products, statuses, reloadProducts }}
    >
      {children}
    </ProductDetailContext.Provider>
  );
};
