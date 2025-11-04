import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Product,
  ProductsDetails,
  colorStyle,
} from '../../../ProductsContext/TabsContext';

export interface ProductContextType {
  product: Product;
  sale: boolean;
  isProductPage: boolean;
  activeImage?: string;
  activeColor?: string;
  activeCapacity?: string;
  setActiveImage: (image: string) => void;
  setActiveColor: (color: string) => void;
  setActiveCapacity: (capacity: string) => void;
  activeProduct?: ProductsDetails;
  activeImagesList: string[];
  setActiveProduct: (product: ProductsDetails | undefined) => void;
  activeDescription: {
    title: string;
    text: string[];
  }[];
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined,
);

export interface ProductProviderProps {
  product: Product;
  children: React.ReactNode;
  sale: boolean;
  isProductPage: boolean;
  initialColor: string | undefined;
  initialCapacity: string | undefined;
  setSearchParams: (params: Record<string, string>) => void;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  product,
  children,
  sale,
  isProductPage,
  setSearchParams,
}) => {
  const [activeImage, setActiveImage] = useState(product?.image);
  const [activeImagesList, setActiveImagesList] = useState<string[]>([]);
  const [activeColor, setActiveColor] = useState(product?.colorHex);
  const [activeCapacity, setActiveCapacity] = useState(product?.capacity);
  const [activeDescription, setActiveDescription] = useState(
    product?.details?.description || [],
  );
  const [activeProduct, setActiveProduct] = useState(product.details);

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
      setActiveProduct(activeProduct);
      setActiveImage(activeProduct.images[0]);
      setActiveImagesList(activeProduct.images);
      setActiveDescription(activeProduct.description);
    } else {
      setActiveProduct(product?.details);
      setActiveImage(product?.image);
      setActiveImagesList(product?.details?.images || []);
      setActiveDescription(product?.details?.description || []);
    }
  }, [product, activeProduct]);

  useEffect(() => {
    if (!setSearchParams) {
      return;
    }

    setSearchParams({
      color: activeColor || '',
      capacity: activeCapacity || '',
    });
  }, [activeColor, activeCapacity, setSearchParams]);

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
        activeProduct,
        activeImagesList,
        setActiveProduct,
        activeDescription,
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
