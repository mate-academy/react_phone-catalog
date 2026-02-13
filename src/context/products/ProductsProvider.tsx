import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Product } from '../../utils/types/Product';
import { ProductDetails } from '../../utils/types/ProductDetails';
import { Categories } from '../../utils/types/Categories';
import { ProductsContext } from './ProductsContext';
import { BASE_URL } from '../../utils/variables/base';

type ProductsData = {
  products: Product[];
  phones: ProductDetails[];
  tablets: ProductDetails[];
  accessories: ProductDetails[];
};

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ProductsData>({
    products: [],
    phones: [],
    tablets: [],
    accessories: [],
  });

  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const [productsRes, phonesRes, tabletsRes, accessoriesRes] =
          await Promise.all([
            fetch(`${BASE_URL}api/products.json`),
            fetch(`${BASE_URL}api/phones.json`),
            fetch(`${BASE_URL}api/tablets.json`),
            fetch(`${BASE_URL}api/accessories.json`),
          ]);

        if (
          !productsRes.ok ||
          !phonesRes.ok ||
          !tabletsRes.ok ||
          !accessoriesRes.ok
        ) {
          throw new Error('Failed to fetch product data');
        }

        const [products, phones, tablets, accessories] = await Promise.all([
          productsRes.json(),
          phonesRes.json(),
          tabletsRes.json(),
          accessoriesRes.json(),
        ]);

        // await new Promise(resolve => setTimeout(resolve, 500));

        setData({ products, phones, tablets, accessories });
        setHasError(false);
      } catch {
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const getProductById = useCallback(
    (id: string) => data.products.find(p => p.itemId === id),
    [data.products],
  );

  const getProductDetails = (category: Categories, productId: string) => {
    const categoryData = data[category as keyof ProductsData] as
      | ProductDetails[]
      | undefined;

    return categoryData?.find(p => p.id === productId);
  };

  const value = useMemo(
    () => ({
      ...data,
      getProductDetails,
      getProductById,
      loading,
      hasError,
    }),
    [data, loading, hasError],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
