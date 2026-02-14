import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { fetchProducts } from '../utils/fetchProducts';

import { Product } from '../types/Product';

export const useProductData = (
  apiUrl: string,
  category: string | undefined,
  newOnly: boolean,
) => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const dataFetchedRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (dataFetchedRef.current) return;

    try {
      const fetchedProducts: Product[] = await fetchProducts(apiUrl);
      setProductsData(fetchedProducts);
      dataFetchedRef.current = true;
    } catch (error) {
      console.error(error);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredProducts = useMemo(() => {
    let preparedProducts = newOnly
      ? productsData
          .filter((product) => product.year === 2022)
          .sort((a, b) => b.fullPrice - a.fullPrice)
      : productsData.filter((product) => product.year !== 2022);

    if (category) {
      return preparedProducts.filter(
        (product) => product.category === category,
      );
    }
    return preparedProducts;
  }, [productsData, category, newOnly]);

  return filteredProducts;
};
