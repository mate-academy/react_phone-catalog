import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ProductCatalogItem } from './types/ProductCatalogItem';
import { getProducts } from './api/products';
import type { Categories } from './types/Categories';

export type ProductDetailIdToProductId = Record<string, number>;

interface ProductContextType {
  products: ProductCatalogItem[];
  categories: Categories;
  productDetailIdToProductId: ProductDetailIdToProductId;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  reloadProducts: () => void;
}

export interface ProductIdentifier {
  category: string;
  itemId?: string;
  id?: string | number;
}

export function getProductDetailId({
  category,
  id,
  itemId,
}: ProductIdentifier): string {
  const productId = itemId || (id ? String(id) : '');

  if (!productId) {
    return '';
  }

  return `${category}-${productId}`;
}

export const ProductCatalogContext = createContext<ProductContextType>({
  products: [],
  categories: {},
  productDetailIdToProductId: {},
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
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const reloadProducts = useCallback(() => {
    setReloadTrigger(prev => prev + 1);
  }, []);

  const categories: Categories = useMemo(
    () =>
      products.reduce<Categories>((acc, product) => {
        const result = acc;

        result[product.category] = (result[product.category] || 0) + 1;

        return result;
      }, {}),

    [products],
  );

  const productDetailIdToProductId: ProductDetailIdToProductId = useMemo(() => {
    const result = Object.fromEntries(
      products
        .filter(Boolean)
        .map(product => [getProductDetailId(product), product.id]),
    );

    return result;
  }, [products]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setLoaded(false);
    getProducts()
      .then(loadedProducts => {
        const reindexedProduct = loadedProducts.reduce<ProductCatalogItem[]>(
          (acc, p) => {
            const result = acc;

            result[p.id] = p;

            return result;
          },
          [],
        );

        setProducts(reindexedProduct);
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
      value={{
        products,
        categories,
        productDetailIdToProductId,
        loading,
        loaded,
        error,
        reloadProducts,
      }}
    >
      {children}
    </ProductCatalogContext.Provider>
  );
};
