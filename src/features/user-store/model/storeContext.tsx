import { createContext, useContext, ReactNode } from 'react';
import { useStore } from './useStore';

type StoreContextType = ReturnType<typeof useStore>;

const StoreContext = createContext<StoreContextType | null>(null);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const store = useStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStoreContext must be used within StoreProvider');
  }

  return context;
};
