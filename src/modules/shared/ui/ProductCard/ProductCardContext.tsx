import React, { useContext, createContext, FC, PropsWithChildren } from 'react';

import { RequiredProduct } from './type';

const ProductCardContext = createContext<RequiredProduct | null>(null);

export const useProductCard = (): RequiredProduct => {
  const product = useContext(ProductCardContext);

  if (!product) {
    throw new Error('No ProductCardContext is provided');
  }

  return product;
};

type Props = PropsWithChildren<{ product: RequiredProduct }>;

export const ProductCardProvider: FC<Props> = ({ product, children }) => {
  return (
    <ProductCardContext.Provider value={product}>
      {children}
    </ProductCardContext.Provider>
  );
};
