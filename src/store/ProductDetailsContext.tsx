import React, { useMemo, useState } from 'react';
import { ProductDetails } from 'types/ProductDetailsPage';

type ProductDetailsContextType = {
  product: ProductDetails | null;
  setProduct: React.Dispatch<React.SetStateAction<ProductDetails | null>>;
  isFavourite: boolean;
  setIsFavourite: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProductDetailsContext =
  React.createContext<ProductDetailsContextType>({
    product: null,
    setProduct: () => {},
    isFavourite: false,
    setIsFavourite: () => {},
  });

type Props = {
  children: React.ReactNode;
};

export const ProductDetailsProvider: React.FC<Props> = ({ children }) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);

  const value = useMemo(
    () => ({
      product,
      setProduct,
      isFavourite,
      setIsFavourite,
    }),
    [product, isFavourite],
  );

  // prettier-ignore
  return (
    <ProductDetailsContext.Provider value={value}>
      {children}
    </ProductDetailsContext.Provider>
  );
};
