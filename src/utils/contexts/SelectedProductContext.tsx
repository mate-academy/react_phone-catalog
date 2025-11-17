/* eslint-disable @typescript-eslint/indent */
import React, { createContext, useContext, useState } from 'react';
import { ProductType } from '../../types/product';

interface SelectedProductContextType {
  selectedProduct: ProductType | null;
  setSelectedProduct: (product: ProductType | null) => void;
  selectedColor: string;
  setSelectedColor: (value: string) => void;
  selectedCapacity: string;
  setSelectedCapacity: (value: string) => void;
  selectedFavorite: ProductType | null;
  setSelectedFavorite: (product: ProductType | null) => void;
  activeProducts: ProductType[];
  toggleActiveProduct: (product: ProductType) => void;
  cartProducts: ProductType[];
  setCartProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  toggleCartProduct: (product: ProductType) => void;
  loading: boolean;
  setLoading: (load: boolean) => void;
  isError: boolean;
  setIsError: (load: boolean) => void;
  additionalNumber: number;
  setAdditionalNumber: (value: number) => void;
}

const SelectedProductContext = createContext<
  SelectedProductContextType | undefined
>(undefined);

export const SelectedProductProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedFavorite, setSelectedFavorite] = useState<ProductType | null>(
    null,
  );
  const [activeProducts, setActiveProducts] = useState<ProductType[]>(() => {
    const storedData = localStorage.getItem('activeProducts');

    return storedData ? (JSON.parse(storedData) as ProductType[]) : [];
  });
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [additionalNumber, setAdditionalNumber] = useState(0);

  const toggleActiveProduct = (product: ProductType) => {
    setActiveProducts(prev => {
      const isActive = prev.find(item => item.id === product.id);

      if (isActive) {
        return prev.filter(item => item.id !== product.id); // Видалити, якщо вже є
      } else {
        return [...prev, product]; // Додати, якщо немає
      }
    });
  };

  const toggleCartProduct = (product: ProductType) => {
    setCartProducts(prev => {
      const isActive = prev.find(item => item.id === product.id);

      if (!isActive) {
        return [...prev, product];
      } else {
        return prev;
      }
    });
  };

  return (
    <SelectedProductContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        selectedColor,
        setSelectedColor,
        selectedCapacity,
        setSelectedCapacity,
        selectedFavorite,
        setSelectedFavorite,
        activeProducts,
        toggleActiveProduct,
        cartProducts,
        toggleCartProduct,
        setCartProducts,
        loading,
        setLoading,
        isError,
        setIsError,
        additionalNumber,
        setAdditionalNumber,
      }}
    >
      {children}
    </SelectedProductContext.Provider>
  );
};

export const useSelectedProduct = (): SelectedProductContextType => {
  const context = useContext(SelectedProductContext);

  if (!context) {
    throw new Error(
      'useSelectedProduct must be used within a SelectedProductProvider',
    );
  }

  return context;
};
