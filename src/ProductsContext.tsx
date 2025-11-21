import { createContext, ReactNode, useEffect, useState } from 'react';
import { ProductCatalogItem } from './types/ProductCatalogItem';
import { getProducts } from './api/products';
import { HOME_CATEGORIES_LIST } from './modules/constants';
import type { Categories } from './types/Categories';

interface ProductsContextType {
  products: ProductCatalogItem[];
  categories: Categories;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const ProductCatalogContext = createContext<ProductsContextType>({
  products: [],
  categories: {},
  loading: false,
  loaded: false,
  error: false,
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

  useEffect(() => {
    setLoading(true);
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
  }, []);

  return (
    <ProductCatalogContext.Provider
      value={{ products, categories, loading, loaded, error }}
    >
      {children}
    </ProductCatalogContext.Provider>
  );
};
