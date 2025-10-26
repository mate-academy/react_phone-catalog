import React, { createContext, useContext, useState } from 'react';
import { Product } from '../../../ProductsContext/TabsContext';

export interface ProductContextType {
  product: Product;
  sale: boolean;
  isProductPage: boolean;
  activeImage: string;
  activeColor?: string;
  activeCapacity: string;
  setActiveImage: (image: string) => void;
  setActiveColor: (color: string) => void;
  setActiveCapacity: (capacity: string) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined,
);

export interface ProductProviderProps {
  product: Product;
  children: React.ReactNode;
  sale: boolean;
  isProductPage: boolean;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  product,
  children,
  sale,
  isProductPage,
}) => {
  const [activeImage, setActiveImage] = useState(product.image);
  const [activeColor, setActiveColor] = useState(product.colorHex);
  const [activeCapacity, setActiveCapacity] = useState(product.capacity);

  return (
    <ProductContext.Provider
      value={{
        product,
        sale,
        isProductPage,
        activeImage,
        setActiveImage,
        activeColor,
        setActiveColor,
        activeCapacity,
        setActiveCapacity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }

  return context;
};
