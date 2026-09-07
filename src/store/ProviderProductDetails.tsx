import React, { useMemo, useRef, useState } from 'react';
import { DetailsProductType } from '../shared/types/DetailsProductType';
import {
  getAccessories,
  getPhone,
  getTablets,
} from '../shared/utils/ProductsDetailApi';
import { ProductCategoryType } from '../shared/types/ProductCatogoryType';

export interface initialProductDetailContext {
  product: DetailsProductType | null;
  getProduct: (id: string, category: ProductCategoryType) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
}

export const ProductDetailContext =
  React.createContext<initialProductDetailContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export const ProviderDetailContext: React.FC<Props> = ({ children }) => {
  const [productsCache, setProductsCache] = useState<
    Record<ProductCategoryType, DetailsProductType[] | null>
  >({
    phones: null,
    tablets: null,
    accessories: null,
  });
  const [product, setProduct] = useState<DetailsProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const lastRequestIdRef = useRef(0);
  const fetchingRef = useRef<
    Record<ProductCategoryType, Promise<DetailsProductType[]> | null>
  >({
    phones: null,
    tablets: null,
    accessories: null,
  });

  const fetchingProducts = (category: ProductCategoryType) => {
    switch (category) {
      case 'phones':
        return getPhone();
      case 'tablets':
        return getTablets();
      case 'accessories':
        return getAccessories();
      default:
        throw new Error();
    }
  };

  const getProduct = async (id: string, category: ProductCategoryType) => {
    lastRequestIdRef.current += 1;
    const requestId = lastRequestIdRef.current;

    setProduct(null);
    setLoading(true);
    setError(false);

    try {
      let items = productsCache[category];

      if (items) {
        const currItem = items.find(item => item.id === id) || null;
        setProduct(currItem);
        return;
      }

      if (!fetchingRef.current[category]) {
        fetchingRef.current[category] = fetchingProducts(category);
      }

      items = await fetchingRef.current[category];

      if (requestId !== lastRequestIdRef.current) {
        return;
      }

      setProductsCache(curr => ({
        ...curr,
        [category]: items,
      }));

      const currItem = items.find(item => item.id === id) || null;
      setProduct(currItem);
      return;
    } catch {
      setError(true);
    } finally {
      fetchingRef.current[category] = null;
      if (requestId === lastRequestIdRef.current) {
        setLoading(false);
      }
    }
  };

  const value: initialProductDetailContext = useMemo(
    () => ({
      product: product,
      getProduct: getProduct,
      isLoading: loading,
      isError: error,
    }),
    [loading, error, product],
  );
  return (
    <ProductDetailContext.Provider value={value}>
      {children}
    </ProductDetailContext.Provider>
  );
};
