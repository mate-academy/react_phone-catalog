import { createContext, useContext } from 'react';
import { DataNames, useProductsStorage } from '../hooks/useProductsStorage';

interface StorageContextType {
  cartItems: string[];
  favouritesItems: string[];
  addProduct: (place: DataNames, id: string) => void;
  removeProduct: (place: DataNames, id: string) => void;
  findProduct: (place: DataNames, id: string) => boolean;
}

const StorageContext = createContext<StorageContextType | null>(null);

export const StorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { addProduct, removeProduct, cartItems, favouritesItems, findProduct } =
    useProductsStorage();

  return (
    <StorageContext.Provider
      value={{
        addProduct,
        removeProduct,
        cartItems,
        favouritesItems,
        findProduct,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => {
  const context = useContext(StorageContext);

  if (!context) {
    throw new Error('useStorage must be used within a StorageProvider');
  }

  return context;
};
