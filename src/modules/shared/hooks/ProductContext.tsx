import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Product,
  ProductsDetails,
  colorStyle,
  useTabs,
} from '../../../ProductsContext/TabsContext';

export interface ProductContextType {
  product: Product;
  sale: boolean;
  isProductPage: boolean;
  activeImage?: string;
  activeColor?: string;
  activeCapacity?: string;
  activeProduct?: ProductsDetails;
  setActiveImage: (image: string) => void;
  setActiveColor: (color: string) => void;
  setActiveCapacity: (capacity: string) => void;
  setActiveProduct: (product: ProductsDetails | undefined) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined,
);

export interface ProductProviderProps {
  product: Product;
  setCurrentProduct: (p: Product) => void;
  children: React.ReactNode;
  sale: boolean;
  isProductPage: boolean;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  product,
  setCurrentProduct,
  children,
  isProductPage,
}) => {
  const [activeImage, setActiveImage] = useState(product?.image);
  const [activeColor, setActiveColor] = useState(product?.colorHex);
  const [activeCapacity, setActiveCapacity] = useState(product?.capacity);
  const [activeProduct, setActiveProduct] = useState(product.details);
  const { productsList } = useTabs();
  const sale = product.details?.priceDiscount !== product.details?.priceRegular;

  const productColorKey = Object.keys(colorStyle).find(
    key => colorStyle[key] === activeColor,
  );

  useEffect(() => {
    const sameModelsList = product?.details?.sameModels;

    if (sameModelsList && activeColor && productColorKey) {
      const active = sameModelsList.find(model => {
        const colorKey = productColorKey.replace(/[\s\-_]/g, '');
        const colorModel = model.color.replace(/[\s\-_]/g, '');

        return colorModel === colorKey && model.capacity === activeCapacity;
      });

      setActiveProduct(active);
    } else {
      setActiveProduct(undefined);
    }
  }, [activeColor, activeCapacity, product, productColorKey]);

  useEffect(() => {
    if (activeProduct) {
      setActiveImage(activeProduct.images[0]);
    } else {
      setActiveProduct(product?.details);
      setActiveImage(product?.image);
    }
  }, [product, activeProduct]);

  useEffect(() => {
    const card = productsList.find(el => el.name === activeProduct?.name);

    if (card) {
      setCurrentProduct(card);
    }
  }, [activeProduct?.name, productsList, setCurrentProduct]);

  return (
    <ProductContext.Provider
      value={{
        product,
        sale,
        isProductPage,
        activeImage,
        activeColor,
        setActiveColor,
        activeCapacity,
        setActiveCapacity,
        activeProduct,
        setActiveProduct,
        setActiveImage,
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
