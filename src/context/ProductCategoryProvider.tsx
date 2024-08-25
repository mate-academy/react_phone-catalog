import React, { createContext, useContext, useState } from 'react';

type ProductCategoryContextType = {
  productType: 'phones' | 'accessories' | 'tablets';
  setProductType: (type: 'phones' | 'accessories' | 'tablets') => void;
};

const ProductCategoryContext = createContext<
  ProductCategoryContextType | undefined
>(undefined);

export const ProductCategoryProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [productType, setProductType] = useState<
    'phones' | 'accessories' | 'tablets'
  >('phones');

  return (
    <ProductCategoryContext.Provider value={{ productType, setProductType }}>
      {children}
    </ProductCategoryContext.Provider>
  );
};

export const useProductCategoryContext = () => {
  const context = useContext(ProductCategoryContext);
  if (!context) {
    throw new Error(
      'useProductCategoryContext must be used within a ProductCategoryProvider',
    );
  }
  return context;
};
