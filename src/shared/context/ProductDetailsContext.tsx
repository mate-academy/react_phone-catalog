import React, { useEffect, useMemo, useState } from 'react';
import { ProductDetails } from '../types/ProductDetails';
import { getAllProducts } from '../api/allProductsDetails';

export const ProductDetailsContext = React.createContext({
  allProducts: [] as ProductDetails[],
  loading: false,
  errorMessage: false,
});

type Props = {
  children: React.ReactNode;
};

export const ProductDetailsProvider: React.FC<Props> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setLoading(true);
    setErrorMessage(false);

    getAllProducts()
      .then(setAllProducts)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      allProducts,
      loading,
      errorMessage,
    }),
    [allProducts, loading, errorMessage],
  );

  return (
    <ProductDetailsContext.Provider value={value}>
      {children}
    </ProductDetailsContext.Provider>
  );
};
